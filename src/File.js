import path from 'path';
import fs from 'fs/promises';
import Command from './Command.js';

class File extends Command {
  constructor(args) {
    super(args);

    if (new.target === File) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }    
  };  

  async _makeDirectory(newPath) {
    try { 
      await fs.mkdir(newPath);
    } catch {} 
  }

  async copy(oldPath, newPath) {
    await this._makeDirectory(newPath);

    const newFilePath = path.resolve(newPath, this._args[0]);
    
    await fs.copyFile(oldPath, newFilePath);
    
    return true;
  };

  async move(oldPath, newPath) {
    await this.copy(oldPath, newPath);

    await this.remove(oldPath);
    
    return true;
  };

  async remove(sourcePath) {
    await fs.rm(sourcePath);
    
    return true;
  };
}

export default File;
