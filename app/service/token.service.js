import * as jwt from 'jsonwebtoken';
import query from '../db/query';

export default {
  async getUser(token) {
    try {
      let secret = jwt.verify(token, process.env.JWT_SECRET);
      let user = await query('selectUser.sql', [secret.data.id]);
      return user.rows[0];
    } catch (error) {
      return null;
    }
  },
};
