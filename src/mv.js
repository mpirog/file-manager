import path from 'path';
import fs from 'fs/promises';
import cp from './cp.js';

class mv extends cp {
  constructor(args) {
    super(args);
  };

  async run() {
    const oldPath = path.resolve(this._currentDirPath, this._args[0]);
    
    await super.run();

    await fs.rm(oldPath);
    
    return true;
  };
}

export default mv;