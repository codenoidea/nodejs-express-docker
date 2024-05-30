import jwt from 'jsonwebtoken'
import bcryptClass from '../../../../util/bcrypt'
import getInfo from './getInfo';
import config from '../../../../config/'

async function checkCompare(params: any) {
  try {
    const { password, info } = params
    const compareResult = await bcryptClass.compare(password, info.password)

    if (compareResult === false) {
      throw 0
    }
  } catch (error) {
    throw error;
  }

}


const signin = async (params: any, models: any) => {
  try {
    const { email, password } = params;

    const info = await getInfo({ email, models })
    // 없는 메일이면 에러
    if (info === null) {
      throw 0
    }

    await checkCompare({ password, info })


    const token = jwt.sign({ userId: info._id, email: info.email }, config.ACCESS_TOKEN_SECRET);

    return {
      token
    };
  } catch (error) {
    throw error;
  }
}

export default signin