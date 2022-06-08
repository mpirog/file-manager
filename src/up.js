import path from 'path';
import Command from './Command.js';

class up extends Command {
  constructor(args) {
    super(args);
  }

  run() {
    // console.log('command up!')
    this._currentDirPath = path.resolve(this._currentDirPath, '../');
    return true;
  }
}

export default up;