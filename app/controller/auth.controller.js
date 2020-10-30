import * as jwt from 'jsonwebtoken';

export default {
  githubCallback(ctx) {
    let data = { id: ctx.state.user.id, token: ctx.state.user.token };
    let encryptedToken = jwt.sign({ data }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });

    ctx.redirect(process.env.APP_URL + `creator?s=${encryptedToken}`);
  },
};
