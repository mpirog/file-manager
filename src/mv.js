import path from 'path';
import File from './File.js';

class mv extends File {
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
    
    try {
      await this.move(oldPath, newPath);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }
  };
};

export default mv;
