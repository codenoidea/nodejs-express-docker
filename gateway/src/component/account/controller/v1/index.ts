import signup from './signup'
import models from '../../models/user'

class Account {
  async signup(params: any) {
    try {
      return await signup(params, models);
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}

export default new Account();