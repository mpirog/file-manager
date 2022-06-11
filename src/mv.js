import path from 'path';
import File from './File.js';

class mv extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    
    try {
      const newPath = path.join(this._currentDirPath, this._args[1]);
      
      await this.move(oldPath, newPath);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }
    
    return true;
  };
};

export default mv;
