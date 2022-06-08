import path from 'path';
import Command from './Command.js';

class cd extends Command {
  constructor(args) {
    super(args);
  }

  async run() {
    // console.log('command cd!')
    await this.setDirPath(path.resolve(this._currentDirPath, this._args.join(' ')));
    return true;
  }
}

export default cd;