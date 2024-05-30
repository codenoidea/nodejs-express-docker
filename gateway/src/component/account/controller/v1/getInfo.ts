export default async function getInfo(params: any) {
  try {
    const { email, models } = params;

    const info = await models.findOne({ email })

    return info
  } catch (error) {
    throw error;
  }
}