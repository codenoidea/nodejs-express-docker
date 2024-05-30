export default {
  MONGODB: process.env.MONGODB || 'mongodb://localhost:27017/express',
  ACCESS_TOKEN_SECRET: 'accessTokenSecret',
  ACCESS_TOKEN_LIFE: 120,
  REFRESH_TOKEN_SECRET: 'refreshTokenSecret',
  REFRESH_TOKEN_LIFE: 86400,
};