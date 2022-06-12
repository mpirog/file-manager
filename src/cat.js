import path from 'path';
import File from './File.js';

class cat extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const args = this.prepareArguments(this._args);
    const sourceFilePath = path.resolve(this._currentDirPath, args.join(' '));

    await this.checkFilePath(sourceFilePath);
    
    await this.readFile(sourceFilePath);    
  };
};

export default cat;
