import query from '../db/query';
import fs from 'fs';

export default {
  async getPopularBoilr(ctx) {
    let data = await query('selectPopularBoilr.sql', []);
    ctx.body = data.rows;
  },

  getConfig(ctx) {
    let data = ctx.request.body['boilr'];
    let config = '';

    if (data) {
      let boilr = data.charAt(0).toLowerCase() + data.slice(1);
      let conf = fs.readFileSync(`./app/config/${boilr}.json`);
      config = JSON.parse(String(conf));
    }

    ctx.body = config;
  },
};
