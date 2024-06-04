import { board, iListReq } from "../../models/board";

const getList = async (params: iListReq): Promise<board[]> => {
  try {
    const { limit, page, userId } = params;
    const result = await board.findAll({
      limit,
    });

    for (const r of result) {
      const { userId } = r;
      r.ownerYn = r.userId === userId ? "Y" : "N";
    }

    return result;
  } catch (err) {
    throw err;
  }
};

export default getList;
