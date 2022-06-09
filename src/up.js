import path from 'path';
import Command from './Command.js';

class up extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    await this.setDirPath(path.resolve(this._currentDirPath, '../'));
    return true;
  };
};

export default up;
