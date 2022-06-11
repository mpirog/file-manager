import path from 'path';
import File from './File.js';

class rm extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    let sourcePath;
    const args = this.prepareArguments(this._args);

    try {
      sourcePath = path.resolve(this._currentDirPath, this._args[0])
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }

    await this.checkFilePath(sourcePath)

    await this.remove(sourcePath);
  };
};

export default rm;
