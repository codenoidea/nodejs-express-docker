nodejs express와 grpc로 시작하는 도커 및 도커컴포즈 feat. mongodb & postgreSql

gateway

- gateway
- sign up
- sign in

board

- board

docker-compose

- 실행: docker-compose up -d --build
- 멈춤 및 컨테이너삭제: docker-compose down
- 로그: docker-compose logs -f

이슈

- docker-compose board에서 volumes의 postgreSql 테이블 생성이 안됨

docker

- 몽고 컨테이너
  docker run -d -p 27017:27017 mongo:latest
- postgre 컨테이너
  docker run -d -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres1234 -e POSTGRES_DB=express postgres:alpine

grpc

- window 인경우
  https://github.com/protocolbuffers/protobuf/releases 에서 protoc-27.0-win64.zip 다운로드 <br/>
  환경 변수 > path에 protoc-27.0-win64/bin 추가 <br/>
  cmd 창에서 protoc --version 확인

- 타입스크립트로 변환하기 위해 cmd에서 실행 <br/>
  protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./src/protos/board.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true
