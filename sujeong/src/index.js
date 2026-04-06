import express from 'express';
import dotenv from 'dotenv';

// 1. 환경 변수 설정 (가장 먼저 실행)
dotenv.config(); 

const app = express();
// 2. .env의 PORT를 사용하거나 기본값 3000 사용
const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 3. 서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});