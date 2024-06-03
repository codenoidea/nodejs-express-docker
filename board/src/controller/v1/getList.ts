import sequelize from "../../db/sequelize";
import { board, iListReq } from "../../models/board";

const getList = async (params: iListReq): Promise<board[]> => {
  try {
    const { limit, page, userId } = params;
    console.log(`params;`, params);
    const result = await board.findAll({
      limit,
      raw: true,
    });

    for (const r of result) {
      const { user_id } = r;
      r.owner_yn = user_id === userId ? "Y" : "N";
    }

    console.log(`result;`, result);
    return result;
  } catch (err) {
    throw err;
  }
};

export default getList;
