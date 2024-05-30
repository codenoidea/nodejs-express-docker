'use strict'

import bcrypt from 'bcrypt';

class Bcrypt {
  salt: number;

  constructor() {
    this.salt = 10;
  }

  genSalt() {
    return bcrypt.genSaltSync(this.salt);
  }

  hash(data: string) {
    const salt = this.genSalt();
    return bcrypt.hashSync(data, salt);
  }

  async compare(data: string, hash: string) {
    return bcrypt.compareSync(data, hash);
  }
}

export default new Bcrypt();