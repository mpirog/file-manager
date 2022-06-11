import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class add extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    const data = await fs.writeFile(sourceFilePath, '');
  };
};

export default add;
