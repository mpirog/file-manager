import fs from 'fs/promises';
import Command from './Command.js';

class ls extends Command {
  constructor(args) {
    super(args);
  }

  async run() {
    // console.log('command ls!')
    await this.checkDirectory(this._currentDirPath);
    const fiels = await fs.readdir(this._currentDirPath, 'utf8');

    console.log(fiels)
    
    return true;
  }
}

export default ls;