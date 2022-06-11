import path from 'path';
import File from './File.js';

class cp extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    let newPath;
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    
    try {
      newPath = path.join(this._currentDirPath, this._args[1]);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }

    try {
      await this.copy(oldPath, newPath);
    } catch (err) {
      throw new Error(`Operation failed: ${err.message}`);
    }
  };
};

export default cp;
