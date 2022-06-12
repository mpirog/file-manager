import path from 'path';
import File from './File.js';

class hash extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    await this.checkFilePath(sourceFilePath);

    const hash = await this.calcHash(sourceFilePath);

    console.log('\x1b[32m%s\x1b[0m', hash.digest('hex'));
  };
};

export default hash;
