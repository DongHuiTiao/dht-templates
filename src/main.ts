import express, { Express } from 'express';
import { apiRouter } from './router';
import mongoose from 'mongoose';
import http from 'http';
import * as dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const port = 3000;

const app: Express = express();
export const server = http.createServer(app)


async function main() {
  try {
    // await mongoose.connect('mongodb://localhost:27017/word-exam')
    await mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, {
      dbName: process.env.MONGODB_TABLE,
      // user: process.env.MONGODB_USER || '',
      // pass: process.env.MONGODB_PASSWORD || '',
      autoIndex: false,
      autoCreate: true,
    })
    console.log('Connected to MongoDB')

    app.use(cors())
    // 使用 JSON 中间件
    app.use(express.json());

    // API 路由
    app.use('/api/v1', apiRouter);

    app.use('/public', express.static('public'))

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    console.log('启动服务成功')

  } catch (error) {
    console.error('启动服务失败', error)
  }
}

main()
