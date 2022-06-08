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

    console.log(data.toString());
    
    return true;
  }
}

export default cat;