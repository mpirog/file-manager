import path from 'path';
import File from './File.js';

class cp extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    const newPath = path.join(this._currentDirPath, this._args[1]);

    await this.copy(oldPath, newPath);
    
    return true;
  };
};

export default cp;
