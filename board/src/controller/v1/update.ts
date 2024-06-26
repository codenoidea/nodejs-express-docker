import sequelize from "../../db/sequelize";
import { board } from "../../models/board";

const update = async (params: any) => {
  const t = await sequelize.transaction();

  try {
    const { title, content, userId, id } = params;

    await board.update(
      {
        title,
        content,
      },
      {
        where: { id, userId },
        transaction: t,
      }
    );

    await t.commit();

    return 1;
  } catch (err) {
    await t.rollback();

    throw err;
  }
};

export default update;
