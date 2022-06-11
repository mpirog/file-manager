import fs from 'fs/promises';
import Command from './Command.js';

class ls extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    await this.checkDirectory(this._currentDirPath);
    const files = await fs.readdir(this._currentDirPath, 'utf8');

    files.forEach((file) => {
      console.log('\x1b[32m%s\x1b[0m', file);
    });
  };
};

export default ls;
