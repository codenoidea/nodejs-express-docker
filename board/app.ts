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
server.bindAsync("localhost:3001", ServerCredentials.createInsecure(), () => {
  server.start();
  console.log(`board server live :: 3001`)
});
