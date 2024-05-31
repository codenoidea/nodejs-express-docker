import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { BoardServiceService, BoardCreate, BoardResult } from "./src/protos/board";

import sequelize from "./src/db/sequelize";
import boardController from './src/controller/v1'

const create = async (
  call: ServerUnaryCall<BoardCreate, BoardResult>,
  callback: sendUnaryData<BoardResult>
) => {
  const { title, content, userId } = call.request;

  const result = await boardController.create({ title, content, userId })

  if (result === 0) {
    return callback(null, { resultCode: 0 });
  }
  callback(null, { resultCode: 1 })

};


const server = new Server();
server.addService(BoardServiceService, { create });
// 0.0.0.0 으로 해야 gateway에서 호출됨
server.bindAsync("0.0.0.0:3001", ServerCredentials.createInsecure(), async () => {
  server.start();
  console.log(`board server live :: 3001`)

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database:', error);
  })
});
