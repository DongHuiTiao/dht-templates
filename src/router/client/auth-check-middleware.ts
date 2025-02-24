import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// 白名单
const whiteList = [
  '/auth/register',
  '/auth/login',
  '/class/options'
];

export function authCheckMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (whiteList.includes(req.path)) {
      next();
      return
    }

    // 从 bearer 中获取 token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'token 不存在，请先登录'
      });
      return;
    }

    // 校验 token 是否有效
    const decoded = jwt.verify(token, 'secret') as { _id: string };

    //   如果无效，则返回 401 状态码
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: 'token 无效，请重新登录'
      });
      return;
    }

    // 如果有效，则将用户信息存储在 req 对象中
    (req as any).body.studentId = decoded._id;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'token 校验失败，请重新登录'
    });
  }
}

