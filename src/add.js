import path from 'path';
import File from './File.js';

class add extends File {
  constructor(args) {
    super(args);
  };

  async run() {
    const args = this.prepareArguments(this._args);

    const sourceFilePath = path.resolve(this._currentDirPath, args.join(' '));

    try {
      await this.createEmptyFile(sourceFilePath);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }
  };
};

export default add;
