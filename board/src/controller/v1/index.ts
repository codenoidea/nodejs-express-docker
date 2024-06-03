import { ServerUnaryCall, sendUnaryData, status } from "@grpc/grpc-js";
import {
  BoardResult,
  BoardId,
  ListBoardRequest,
  ListBoardResponse,
  CreateBoardRequest,
  CreateBoardResponse,
  GetBoardRequest,
  GetBoardResponse,
  UpdateBoardRequest,
  UpdateBoardResponse,
  DeleteBoardRequest,
  DeleteBoardResponse,
  Board,
  BoardServiceServer,
} from "../../protos/board";

import createFnc from "./create";
import getList from "./getList";
import updateFnc from "./update";
import deleteFnc from "./delete";
import getInfo from "./getInfo";

export function getBoardServer(): BoardServiceServer {
  async function create(
    call: ServerUnaryCall<CreateBoardRequest, CreateBoardResponse>,
    callback: sendUnaryData<CreateBoardResponse>
  ) {
    try {
      const board = await createFnc(call.request);
      const boardPB = Board.fromJSON(board);
      const response: CreateBoardResponse = {
        board: boardPB,
      };
      callback(null, response);
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }

  async function list(
    call: ServerUnaryCall<ListBoardRequest, ListBoardResponse>,
    callback: sendUnaryData<ListBoardResponse>
  ) {
    try {
      const boards: any = await getList(call.request);
      // const boardsPB = boards.map(Board.fromJSON);
      // const response: ListBoardResponse = {
      //   boards: boardsPB,
      // };
      console.log(`boards;`, boards);
      callback(null, boards);
    } catch (err) {
      console.error(err);
      callback({ code: status.INTERNAL }, null);
    }
  }

  async function info(
    call: ServerUnaryCall<GetBoardRequest, GetBoardResponse>,
    callback: sendUnaryData<GetBoardResponse>
  ) {
    try {
      const board = await getInfo(call.request);
      if (board) {
        const boardPB = Board.fromJSON(board);
        const response: GetBoardResponse = {
          board: boardPB,
        };
        callback(null, response);
      } else {
        callback(
          {
            code: status.NOT_FOUND,
            message: `Product ${call.request.id} not found`,
          },
          null
        );
      }
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }

  async function update(
    call: ServerUnaryCall<UpdateBoardRequest, UpdateBoardResponse>,
    callback: sendUnaryData<UpdateBoardResponse>
  ) {
    const result = await updateFnc(call.request);

    callback({ code: status.UNIMPLEMENTED }, null);
  }

  async function deleteF(
    call: ServerUnaryCall<DeleteBoardRequest, DeleteBoardResponse>,
    callback: sendUnaryData<DeleteBoardResponse>
  ) {
    const result = await deleteFnc(call.request);

    callback({ code: status.UNIMPLEMENTED }, null);
  }

  return { create, list, info, update, delete: deleteF };
}
