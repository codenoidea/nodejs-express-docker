docker-compose up -d --build

docker-compose down

docker-compose logs -f

docker run -d -p 27017:27017 mongo:latest

grpc
  - window 인경우
  https://github.com/protocolbuffers/protobuf/releases 에서 protoc-27.0-win64.zip 다운로드
  환경 변수 > path에 protoc-27.0-win64/bin 추가
  cmd 창에서 protoc --version 확인


  - 타입스크립트로 변환하기 위해 실행
  protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./src/protos/board.proto --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true
