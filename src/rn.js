import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class rn extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    const newPath = path.resolve(this._currentDirPath, this._args[1]);

    const data = await fs.rename(oldPath, newPath);
  };
};

export default rn;
