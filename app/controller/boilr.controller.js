import query from '../db/query';
import fs from 'fs';
import cliService from '../service/cli.service';
import zipperService from '../service/zipper.service';
import send from 'koa-send';
import { exec } from 'child_process';
import githubService from '../service/github.service';
import * as jwt from 'jsonwebtoken';
import tokenService from '../service/token.service';

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

  async download(ctx) {
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

  async upload(ctx) {
    let config = ctx.request.body.config;

    let user = await tokenService.getUser(ctx.request.body.secret);
    if (user === null) {
      ctx.body = {
        redirect: `${process.env.APP_URL}signin/`,
      };
      return;
    }

    ctx.res.once('finish', () => {
      exec(`rm -rf ${config.header.title}*`, { cwd: './tmp' });
    });

    if (config.cli) await cliService.create(config);
    await githubService.createRepository(config.header.title, user);
    await githubService.createPullRequest(config.header.title, user);
    await githubService.mergePullRequest(config.header.title, user);
    let repositoryInfos = await githubService.getRepository(config.header.title, user);

    ctx.body = {
      ssh_url: repositoryInfos.data.ssh_url,
      html_url: repositoryInfos.data.html_url,
    };
  },
};
