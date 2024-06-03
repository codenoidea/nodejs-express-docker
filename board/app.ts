import { Server, ServerCredentials } from "@grpc/grpc-js";
import { BoardServiceService } from "./src/protos/board";

import sequelize from "./src/db/sequelize";
import { getBoardServer } from "./src/controller/v1";

const server = new Server();
server.addService(BoardServiceService, getBoardServer());
// 0.0.0.0 으로 해야 gateway에서 호출됨

server.bindAsync(
  "0.0.0.0:3001",
  ServerCredentials.createInsecure(),
  async () => {
    server.start();
    console.log(`board server live :: 3001`);

    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
      });
  }
);
