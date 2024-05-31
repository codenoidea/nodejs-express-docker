board

npm 
  - npm i @grpc/grpc-js@1.9.0 #최신버전 1.10 에선 start() 함수가 Deprecated
  - npm i @types/cookie-parser @types/express @types/node ts-node-dev typescript ts-proto @types/morgan --save-dev


일반실행
  - npm ci
  - npm start


docker실행
  - docker build . -t grpc-board
  - docker run -d -p 3001:3001 grpc-board


