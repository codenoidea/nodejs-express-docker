import sequelize from "../../db/sequelize";
import { board } from "../../models/board";


const create = async (params: any) => {
  const t = await sequelize.transaction()

  try {
    const { title, content, userId } = params;

    await board.create({
      title, content, userid: userId
    }, { transaction: t })

    await t.commit();

    return 0
  } catch (err) {
    await t.rollback();

    throw err
  }


};

export default create;