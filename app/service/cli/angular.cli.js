import { exec } from 'child_process';
import { promiseFromChildProcess } from './../promiser.service';

let angular = (config) => {
  let optsMap = {
    '--interactive': false,
    '--skipInstall': true,
    '--packageManager': config.options.find((e) => e.name === 'manager').items.find((e) => e.active === true).label,
    '--style': config.options.find((e) => e.name === 'style').items.find((e) => e.active === true).label,
    '--inlineStyle': config.options.find((e) => e.name === 'inlineStyle').item,
    '--inlineTemplate': config.options.find((e) => e.name === 'inlineTemplate').item,
    '--legacyBrowsers': config.options.find((e) => e.name === 'legacyBrowsers').item,
    '--minimal': config.options.find((e) => e.name === 'minimal').item,
    '--routing': config.options.find((e) => e.name === 'routing').item,
  };

  let cmd = `ng new ${config.header.title} `;
  Object.keys(optsMap).forEach((key) => {
    cmd += `${key}=${optsMap[key]} `;
  });

  let child = exec(cmd, { cwd: './tmp' });
  return promiseFromChildProcess(child);
};

export { angular };
