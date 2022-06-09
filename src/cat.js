import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class cat extends Command {
  constructor(args) {
    super(args);
  }

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    const data = await fs.readFile(sourceFilePath);

    console.log('\x1b[32m%s\x1b[0m', data.toString());
    
    return true;
  }
}

export default cat;