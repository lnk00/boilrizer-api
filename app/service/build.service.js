import { readFileSync } from 'fs';
import { glob } from 'glob';
import fs from 'fs';

export default {
  fileTree(dirPath) {
    let fileContent = {};

    let files = glob.sync(dirPath + '/**/*', { dot: true });

    files.forEach(async (file) => {
      if (!fs.lstatSync(file).isDirectory()) {
        let f = readFileSync(file, 'utf-8');
        let buff = Buffer.from(f);
        let contentEncoded = buff.toString('base64');

        fileContent[file.replace(dirPath, '')] = {
          content: contentEncoded,
          encoding: 'base64',
        };
      }
    });

    return fileContent;
  },
};
