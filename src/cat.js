import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class cat extends Command {
  constructor(args) {
    super(args);
  }

  async run() {
    const catFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    await this.checkFile(catFilePath);

    const data = await fs.readFile(catFilePath);

    console.log(data.toString());
    
    return true;
  }
}

export default cat;