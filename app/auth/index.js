import GithubStrategy from './strategy/github.strategy';

const authStrategyRegister = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(GithubStrategy());
};

export { authStrategyRegister };
