import sequelize from "../../db/sequelize";
import { board } from "../../models/board";

const deleteFnc = async (params: any) => {
  const t = await sequelize.transaction();

  try {
    const { id, userId } = params;

    await board.destroy({
      where: {
        id,
        userId,
      },
      transaction: t,
    });

    await t.commit();

    return 1;
  } catch (err) {
    await t.rollback();

    throw err;
  }
};

export default deleteFnc;
