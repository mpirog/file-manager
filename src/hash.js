import path from 'path';
import fs from 'fs/promises';
import { createHash } from 'crypto';
import Command from './Command.js';

class hash extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    const data = await fs.readFile(sourceFilePath);

    const hash = createHash("sha256");

    hash.update(data);

    console.log('\x1b[32m%s\x1b[0m', hash.digest('hex'));
    
    return true;
  };
};

export default hash;
