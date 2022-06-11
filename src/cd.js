import path from 'path';
import Command from './Command.js';

class cd extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    const args = this._args.reduce((collector, arg) => {
      arg = arg.trim();

      if (arg) {
        collector.push(arg);
      }

      return collector;
    }, []);

    await this.setDirPath(path.resolve(this._currentDirPath, args.join(' ')));
  };
};

export default cd;
