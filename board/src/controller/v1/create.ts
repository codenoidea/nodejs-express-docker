import sequelize from "../../db/sequelize";
import { board } from "../../models/board";

interface createBoard {
  title: string;
  content: string;
  userId: string;
}

const create = async (params: createBoard): Promise<board> => {
  const t = await sequelize.transaction();

  try {
    const { title, content, userId } = params;

    const result = await board.create(
      {
        title,
        content,
        user_id: userId,
      },
      {
        plain: true,
        raw: true,
        transaction: t,
      }
    );

    await t.commit();

    result.owner_yn = "Y";

    return result;
  } catch (err) {
    await t.rollback();

    throw err;
  }
};

export default create;
