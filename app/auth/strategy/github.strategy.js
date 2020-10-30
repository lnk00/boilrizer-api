import { Strategy } from 'passport-github';
import query from '../../db/query';

const checkUser = (data, profile, done) => {
  let user = data.rows[0];
  if (user) {
    query('updateUserToken.sql', [profile.token, profile.id]);
    return done(null, user);
  } else {
    let newUser = query('insertUser.sql', [profile._json.email, profile.id, accessToken, profile.username]);
    return done(null, newUser);
  }
};

const githubStrategy = () =>
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK,
      scope: ['repo'],
    },
    (accessToken, refreshToken, profile, done) => {
      profile.token = accessToken;
      query('selectUser.sql', [profile.id])
        .then((data) => checkUser(data, profile, done))
        .catch((err) => done(err, false));
      done(null, profile);
    }
  );

export default githubStrategy;
