import query from '../db/query';
import fs from 'fs';
import cliService from '../service/cli.service';
import zipperService from '../service/zipper.service';
import send from 'koa-send';
import { exec } from 'child_process';

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

  async create(ctx) {
    let config = ctx.request.body.config;

    ctx.res.once('finish', () => {
      exec(`rm -rf ${config.header.title}*`, { cwd: './tmp' });
    });

    if (config.cli) await cliService.create(config);
    await zipperService.zip(config.header.title);

    const path = `./tmp/${config.header.title}.zip`;
    ctx.attachment(path);
    await send(ctx, path);
  },
};
