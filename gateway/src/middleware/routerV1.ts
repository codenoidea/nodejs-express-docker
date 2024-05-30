import accountV1 from '../component/account/router/v1';

export default function (app: any) {

  app.use('/v1/account', accountV1)
}