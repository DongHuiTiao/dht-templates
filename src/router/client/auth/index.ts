import { ClassModel, StudentModel } from "@/models";
import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  try {
    const { account, password } = req.body;

    const student = await StudentModel.findOne({ account }).populate('classId', { name: 1 });

    if (!student) {
      res.json({
        success: false,
        message: '账号或密码错误'
      });
      return
    }

    // 使用 bcrypt.compare 验证密码
    const isPasswordValid = await bcrypt.compare(password, student.password);

    if (!isPasswordValid) {
      res.json({
        success: false,
        message: '账号或密码错误'
      });
      return;
    }

    if (student.isDisabled) {
      res.json({
        success: false,
        message: '账号已禁用'
      });
      return;
    }

    await StudentModel.findByIdAndUpdate(student._id, { lastLoginTime: Date.now() });

    const { name, _id, lastLoginTime, classId } = student

    const token = jwt.sign({ _id }, 'secret', { expiresIn: '1h' });

    const refreshToken = jwt.sign({ _id }, 'refreshSecret', { expiresIn: '7d' });

    const expiresAt = Date.now() + 1 * 60 * 60 * 1000;

    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

    res.json({
      success: true,
      message: '登录成功',
      data: {
        userInfo: {
          name, _id, lastLoginTime, classId
        },
        token,
        refreshToken,
        expiresAt,
        refreshExpiresAt
      },
    });

  } catch (error) {
    res.json({
      success: false,
      message: '登录失败'
    });
    console.log('error', error)
  }
})


authRouter.post('/register', async (req, res) => {
  try {
    const { account, password, name, classId } = req.body;

    // 判断是否已存在

    const existingStudent = await StudentModel.findOne({ account });

    if (existingStudent) {
      res.status(400).json({ message: '账号已存在' });
      return;
    }

    // 判断是否班级不存在
    const classInfo = await ClassModel.findById(classId);

    if (!classInfo) {
      res.status(400).json({ message: '班级不存在' });
      return;
    }

    // 给密码加密
    const encryptedPassword = await bcrypt.hash(password, 10);

    const student = await StudentModel.create({ account, password: encryptedPassword, name, classId });

    // 把学生加到班级中
    await ClassModel.findByIdAndUpdate(classId, { $push: { students: student._id } });

    res.status(200).json({ message: '注册成功', student });
  } catch (error) {
    res.status(500).json({ message: '注册失败' });
  }
})


authRouter.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.json({ message: '退出成功' });
})

authRouter.post('/refresh-token', async (req, res) => {
  try {
    // 1. 校验 refreshToken
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      res.json({
        success: false,
        message: '缺少 refreshToken'
      });
      return
    }

    // 2. 生成新的 token 和 refreshToken
    const decoded = jwt.verify(refreshToken, 'refreshSecret') as { id: string };

    const studentId = decoded.id;
    // 判断用户是否有效
    const student = await StudentModel.findById(studentId);

    if (!student) {
      res.json({
        success: false,
        message: '用户不存在'
      });
      return
    }

    await StudentModel.findByIdAndUpdate(student._id, { lastLoginTime: Date.now() });

    const { name, _id, lastLoginTime, classId } = student

    const newToken = jwt.sign({ _id }, 'secret', { expiresIn: '1h' });

    const newRefreshToken = jwt.sign({ _id }, 'refreshSecret', { expiresIn: '7d' });

    const expiresAt = Date.now() + 1 * 60 * 60 * 1000;

    const refreshExpiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

    // 3. 返回新的 token 和 refreshToken
    res.status(200).json({
      success: true,
      message: '刷新 token 成功',
      data: {
        userInfo: {
          name, _id, lastLoginTime, classId
        },
        token: newToken,
        refreshToken: newRefreshToken,
        expiresAt,
        refreshExpiresAt
      }
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: `刷新 token 失败: ${error.message}`
    });
  }
})



