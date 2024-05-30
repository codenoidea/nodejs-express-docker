import bcryptClass from '../../../../util/bcrypt'
import getInfo from './getInfo';

async function checkExistEmail(params: any) {
  const { email, models } = params;
  const info = await getInfo({ email, models })
  if (info) {
    throw 0
  }

}

const signup = async (params: any, models: any) => {

  const session = await models.startSession();
  session.startTransaction();

  try {
    const { email, nickname, password } = params;

    await checkExistEmail({ email, models })

    const encPassword = bcryptClass.hash(password)

    await models.create({ email, nickname, password: encPassword }, session);
    await session.commitTransaction();

    return 1;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export default signup