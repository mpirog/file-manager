import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class rn extends Command {
  constructor(args) {
    super(args);
  }

  async _makeDirectory(newPath) {
    try {
      await fs.mkdir(newPath);
    } catch {
    } 
  }

  async run() {
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    const newPath = path.join(this._currentDirPath, this._args[1]);

    this._makeDirectory(newPath);

    const newFilePath = path.resolve(newPath, this._args[0]);

    await fs.copyFile(oldPath, newFilePath);
    
    return true;
  }
}

export default rn;