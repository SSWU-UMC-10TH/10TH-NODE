import express from 'express'  
import cors from 'cors'         
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

const app = express()
const port = 3000

app.use(cors());                          
app.use(express.static("public"));        
app.use(express.json());                  
app.use(express.urlencoded({ extended: false })); 

// Swagger UI 연결
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

// Swagger OpenAPI 사양 생성 엔드포인트
app.get("/openapi.json", async (req, res, next) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; 
  const routes = ["./src/index.js"]; 
  const doc = {
    info: {
      title: "UMC 9th",
      description: "UMC 9th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 기본 루트 API
app.get('/', (req, res) => {
  res.send('Hello World!~~')
})


/**
 * 💡 과제 조건 충족을 위한 임시 회원가입 API
 * @Route("/api/signup")
 * @Post
 */
app.post('/api/signup', (req, res) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = '회원가입 API'
    // #swagger.description = '회원가입을 처리하는 엔드포인트입니다.'
    
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: '회원가입 요청 데이터 (Body 파라미터)',
        required: true,
        schema: {
            email: 'user@example.com',
            name: '홍길동'
        }
    } */

    const { email } = req.body;

    // ❌ 응답이 실패할 수 있는 경우 (실패 케이스 문서화)
    if (email === "fail@test.com") {
        /* #swagger.responses[400] = {
            description: '중복된 이메일 에러 (실패 응답 케이스)',
            schema: {
                resultType: "FAIL",
                error: {
                    errorCode: "EMAIL_DUPLICATE",
                    message: "이미 존재하는 이메일입니다."
                }
            }
        } */
        return res.status(400).json({
            resultType: "FAIL",
            error: {
                errorCode: "EMAIL_DUPLICATE",
                message: "이미 존재하는 이메일입니다."
            }
        });
    }

    // ⭕ 응답의 성공 케이스가 문서화 (성공 케이스 문서화)
    /* #swagger.responses[200] = {
        description: '회원가입 성공 (성공 응답 케이스)',
        schema: {
            resultType: "SUCCESS",
            data: {
                message: "회원가입이 성공적으로 완료되었습니다!"
            }
        }
    } */
    return res.status(200).json({
        resultType: "SUCCESS",
        data: {
            message: "회원가입이 성공적으로 완료되었습니다!"
        }
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})