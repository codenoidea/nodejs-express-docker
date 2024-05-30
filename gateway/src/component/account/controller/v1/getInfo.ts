export default async function getInfo(params: any) {
  try {
    const { email, models } = params;

    const info = await models.findOne({ email }, '_id, nickname, email, password')

    return info
  } catch (error) {
    throw error;
  }
}