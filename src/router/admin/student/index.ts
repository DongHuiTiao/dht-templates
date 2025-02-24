import { ClassModel, StudentModel } from '@/models';
import { Router } from 'express';
import bcrypt from 'bcrypt';

export const studentRouter = Router()

// 创建学生
studentRouter.post('/', async (req, res) => {
  try {
    const { name, classId, account, password } = req.body
    const studentItem = await StudentModel.create({ name, classId, account, password })

    // 把学生添加到班级中
    await ClassModel.findByIdAndUpdate(classId, { $push: { students: studentItem._id } })
    res.json({
      success: true,
      message: '创建学生成功',
    })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: '创建学生失败' 
    })
    console.log('error',error)
  }
})


// 获取学生列表
studentRouter.get('/list', async (req, res) => {
  try {
    const { 
      pageNum: pageNumStr, 
      pageSize: pageSizeStr,
      classId,
      keyword
    } = req.query;

    const pageNum = Number(pageNumStr) - 1
    const pageSize = Number(pageSizeStr)

    const query: any = {}

    if (classId) {
      query.classId = classId
    }

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' }
    }

    const students = await StudentModel.find(query, { password: 0 })
    .skip(pageNum * pageSize)
    .limit(pageSize)
    .sort({
      createdAt: -1
    })

    // 总数统计查询
    const total = await StudentModel.countDocuments(query);

    res.json({
      success: true,
      message: '获取学生列表成功',
      data: {
        list: students,
        total
      }
    })
  } catch (error) {
    res.json({
      success: false,
      message: '获取学生列表失败'
    })
    console.log('error',error)
  }
})

// 修改学生禁用状态
studentRouter.put('/disable', async (req, res) => {
  try {
    const { id, isDisabled } = req.body
    await StudentModel.findByIdAndUpdate(id, { isDisabled }, { new: true })
    res.json({
      success: true,
      message: '修改学生禁用状态成功',
    })
  } catch (error) {
    res.json({
      success: false,
      message: '修改学生禁用状态失败'
    })
    console.log('error',error)
  }
})

// 更新学生
studentRouter.put('/', async (req, res) => {
  try {
    const { _id, name, classId, password, account } = req.body

    // 查找是否有这个学生
    const student = await StudentModel.findById(_id)

    if (!student) {
      res.status(404).json({
        success: false,
        message: '学生不存在，更新失败'
      })
      return
    }

    // 如果账号发生修改
    if (account !== student.account) {
      const existingStudent = await StudentModel.findOne({ account })
      if (existingStudent) {
        res.status(400).json({ 
          success: false,
          message: '账号已存在，更新失败' 
        })
        return
      }

      // 如果账号没有被占用，修改账号
      await StudentModel.findByIdAndUpdate(_id, { account })
    }

    const classInfo = await ClassModel.findById(classId)

    if (!classInfo) {
      res.status(404).json({
        success: false,
        message: '班级不存在，更新失败'
      })
      return
    }

    const updateData: any = {
      name,
      classId,
    }

    // 查看是否有新密码
    if (password) {
      // 给密码加密
      const encryptedPassword = await bcrypt.hash(password, 10);
      updateData.password = encryptedPassword
    }

    // 更新学生
    await StudentModel.findByIdAndUpdate(_id, updateData)

    res.json({
      success: true,
      message: '更新学生成功'
    })
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: '更新学生失败' 
    })
    console.log('error',error)
  }
})

// 删除学生
studentRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const studentItem = await StudentModel.findById(id)

    if (!studentItem) {
      res.status(404).json({ message: '学生不存在' })
      return
    }

    await StudentModel.findByIdAndDelete(id)

    // 把学生从班级中删除
    await ClassModel.findByIdAndUpdate(studentItem.classId, { $pull: { students: id } })
    res.json({ message: '学生删除成功' })
  } catch (error) {
    res.status(500).json({ message: '删除学生失败' })
    console.log('error',error)
  }
})
