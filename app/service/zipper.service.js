import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { promiseFromChildProcess } from './promiser.service';

export default {
  zip(title) {
    let output = createWriteStream(`./tmp/${title}.zip`);
    let archive = archiver('zip');

    archive.pipe(output);
    archive.directory(`./tmp/${title}`, false);
    archive.finalize();

    return promiseFromChildProcess(output);
  },
};
