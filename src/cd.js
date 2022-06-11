import path from 'path';
import Command from './Command.js';

class cd extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    const args = this.prepareArguments(this._args);

    await this.setDirPath(path.resolve(this._currentDirPath, args.join(' ')));
  };
};

export default cd;
