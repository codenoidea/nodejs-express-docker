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
      const boards = await getList(call.request);
      const boardsPB = boards.map(Board.fromJSON);

      const response: ListBoardResponse = { boards: boardsPB };

      callback(null, response);
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
          boards: boardPB,
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
    try {
      const board = await updateFnc(call.request);
      const result = UpdateBoardResponse.fromJSON({ boardResult: board });
      callback(null, result);
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }

  async function deleteF(
    call: ServerUnaryCall<DeleteBoardRequest, DeleteBoardResponse>,
    callback: sendUnaryData<DeleteBoardResponse>
  ) {
    try {
      const board = await deleteFnc(call.request);
      const result = DeleteBoardResponse.fromJSON({ boardResult: board });
      callback(null, result);
    } catch (err) {
      callback({ code: status.INTERNAL }, null);
      console.error(err);
    }
  }

  return { create, list, info, update, delete: deleteF };
}
