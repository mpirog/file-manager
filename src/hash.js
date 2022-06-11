import path from 'path';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import Command from './Command.js';

class hash extends Command {
  constructor(args) {
    super(args);
  };

  _calcHash(sourceFilePath) {
    const hash = createHash("sha256");

    return new Promise(resolve => {
      const sourceReadStream = createReadStream(sourceFilePath);
      
      sourceReadStream
        .on('data', (chank) => {
          hash.update(chank);
        })
        .on('end', () => {
          resolve(hash)
        });
    });
  }

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));
    await this.checkFilePath(sourceFilePath);

    const hash = await this._calcHash(sourceFilePath);

    console.log('\x1b[32m%s\x1b[0m', hash.digest('hex'));
  };
};

export default hash;
