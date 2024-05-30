import bcryptClass from '../../../../util/bcrypt'
import getInfo from './getInfo';

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

    return 1;
  } catch (error) {
    throw error;
  }
}

export default signin