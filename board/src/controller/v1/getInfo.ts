import { board, iInfoReq } from "../../models/board";

const getInfo = async (params: iInfoReq): Promise<board | null> => {
  try {
    const { id, userId } = params;

    const result = await board.findOne({
      where: { id },
      plain: true,
      raw: true,
    });
    if (result) result.ownerYn = userId === result.userId ? "Y" : "N";

    return result;
  } catch (err) {
    throw err;
  }
};

export default getInfo;
