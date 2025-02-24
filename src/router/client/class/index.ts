import { ClassModel } from "@/models";
import { Router } from "express";

export const classRouter = Router();


classRouter.get('/options', async (req, res) => {
  try {
    // 只需要 name 字段
    const classes = await ClassModel.find({ isShow: true }, { name: 1, _id: 1 });
    res.json({
      success: true,
      message: '获取班级列表成功',
      data: classes
    });
  } catch (error) {
    res.json({
      success: false,
      message: '获取班级列表失败'
    })
    console.log('error', error)
  }
})



