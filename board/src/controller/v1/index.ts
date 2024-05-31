import create from "./create";

class Board {
  async create(params: any) {
    try {
      return await create(params);
    } catch (error) {
      throw error;
    }
  }
}

export default new Board();