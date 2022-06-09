import path from 'path';
import File from './File.js';

class rm extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const sourcePath = path.resolve(this._currentDirPath, this._args[0]);

    this.remove(sourcePath);
    
    return true;
  };
};

export default rm;
