import bcryptClass from '../../../../util/bcrypt'

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

    const info = await models.findOne({ email }, 'password');

    await checkCompare({ password, info })

    return 1;
  } catch (error) {
    throw error;
  }
}

export default signin