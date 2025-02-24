import { ClassModel, StudentModel } from '@/models';
import { Router } from 'express';

export const classRouter = Router()

// 创建班级
classRouter.post('/', async (req, res) => {
  try {
    const { name } = req.body
    await ClassModel.create({ name })
    res.json({
      success: true,
      message: '创建班级成功',
    })
  } catch (error) {
    res.json({
      success: false,
      message: '创建班级失败'
    })
    console.log('error', error)
  }
})


// 获取班级列表
classRouter.get('/list', async (req, res) => {
  try {
    const classes = await ClassModel.find()

    const data = []

    for (const classItem of classes) {
      const students = await StudentModel.find({ classId: classItem._id })

      const studentCount = students.length

      const { _id, name, createdAt, updatedAt, isShow } = classItem
      data.push({
        _id,
        name,
        studentCount,
        isShow,
        createdAt,
        updatedAt
      })
    }

    res.json({
      success: true,
      message: '获取班级列表成功',
      data
    })
  } catch (error) {
    res.json({
      success: false,
      message: '获取班级列表失败'
    })
    console.log('error', error)
  }
})

// 更新班级
classRouter.put('/', async (req, res) => {
  try {
    const { _id, name, isShow } = req.body
    // 判断班级是否存在
    const classItem = await ClassModel.findById(_id)

    const updateConfig: any = {}

    if (name) {
      updateConfig.name = name
    }

    if (isShow !== undefined) {
      updateConfig.isShow = isShow
    }

    if (!classItem) {
      res.json({
        success: false,
        message: '班级不存在'
      })
      return
    }
    await ClassModel.findByIdAndUpdate(_id, updateConfig, { new: true })
    res.json({
      success: true,
      message: '班级更新成功'
    })
  } catch (error) {
    res.json({
      success: false,
      message: '班级更新失败'
    })
    console.log('error', error)
  }
})

// 删除班级
classRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    // 判断班级是否存在
    const classItem = await ClassModel.findById(id)
    if (!classItem) {
      res.json({
        success: false,
        message: '班级不存在，删除失败'
      })
      return
    }

    // 判断班级是否存在学生
    const students = await StudentModel.find({ classId: id })
    if (students.length > 0) {
      res.json({
        success: false,
        message: '班级存在学生，删除失败'
      })
      return
    }

    await ClassModel.findByIdAndDelete(id)
    res.json({
      success: true,
      message: '班级删除成功'
    })
  } catch (error) {
    res.json({
      success: false,
      message: '班级删除失败'
    })
    console.log('error', error)
  }
})


