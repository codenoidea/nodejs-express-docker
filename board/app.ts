import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { BoardServiceService, BoardCreate, BoardResult } from "./src/protos/board";

const create = (
  call: ServerUnaryCall<BoardCreate, BoardResult>,
  callback: sendUnaryData<BoardResult>
) => {
  console.log('create')
  callback(null, { resultCode: 1 });

};


const server = new Server();
server.addService(BoardServiceService, { create });
// 0.0.0.0 으로 해야 gateway에서 호출됨
server.bindAsync("0.0.0.0:3001", ServerCredentials.createInsecure(), () => {
  server.start();
  console.log(`board server live :: 3001`)
});
