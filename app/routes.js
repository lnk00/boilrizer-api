import Auth from './controller/auth.controller';
import Boilr from './controller/boilr.controller';

const routeRegister = (router, passport) => {
  router.get('/ping', (ctx) => (ctx.body = { message: 'pong' }));
  router.get('/auth/github', passport.authenticate('github'));
  router.get('/auth/github/callback', passport.authenticate('github'), Auth.githubCallback.bind(this));

  router.get('/v1/popular', Boilr.getPopularBoilr.bind(this));
  router.post('/v1/config', Boilr.getConfig.bind(this));
  router.post('/v1/download', Boilr.download.bind(this));
  router.post('/v1/upload', Boilr.upload.bind(this));
};

export default routeRegister;
