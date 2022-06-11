import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class rn extends Command {
  constructor(args) {
    super(args);
  };

  async run() {    
    let newPath;
    let oldPath;

    const args = this.prepareArguments(this._args);

    try {
      oldPath = path.resolve(this._currentDirPath, args[0]);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }

    try {
      newPath = path.join(this._currentDirPath, args[1]);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }

    const data = await fs.rename(oldPath, newPath);
  };
};

export default rn;
