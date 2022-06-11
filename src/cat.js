import path from 'path';
import fs from 'fs';
import Command from './Command.js';

class cat extends Command {
  constructor(args) {
    super(args);
  };

  _readFile(sourceFilePath) {
    return new Promise(resolve => {
      const sourceReadStream = fs.createReadStream(sourceFilePath);
      
      sourceReadStream
        .on('data', (chank) => {
          console.log('\x1b[35m%s\x1b[0m', chank.toString());
        })
        .on('end', () => {
          resolve();
        });
    });
  }

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args.join(' '));

    await this.checkFilePath(sourceFilePath);
    
    await this._readFile(sourceFilePath);    
  };
};

export default cat;
