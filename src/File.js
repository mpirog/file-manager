import path from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'node:stream/promises';
import { createHash } from 'crypto';
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
      await fs.mkdir(newPath, {recursive: true});
    } catch (err) {
      // console.log(err)
    } 
  };

  async createEmptyFile(sourceFilePath) {
    await fs.writeFile(sourceFilePath, '');
  };  

  readFile(sourceFilePath) {
    return new Promise(resolve => {
      const sourceReadStream = createReadStream(sourceFilePath);
      
      sourceReadStream
        .on('data', (chank) => {
          console.log('\x1b[35m%s\x1b[0m', chank.toString());
        })
        .on('end', () => {
          resolve();
        });
    });
  };

  async copy(oldPath, newPath) {
    await this._makeDirectory(newPath);
    
    const newFilePath = path.resolve(newPath, this._args[0]);
    
    const sourceReadStream = createReadStream(oldPath);
    
    const destinationWriteStream = createWriteStream(newFilePath);
    
    await pipeline(
      sourceReadStream,
      destinationWriteStream
    );
  };

  async asyncCopy(oldPath, newPath) {
    await this._makeDirectory(newPath);

    const newFilePath = path.resolve(newPath, this._args[0]);
    
    await fs.copyFile(oldPath, newFilePath);
  };

  async move(oldPath, newPath) {
    await this.copy(oldPath, newPath);

    await this.remove(oldPath);
    
    return true;
  };

  async remove(sourcePath) {
    await fs.rm(sourcePath);
  };

  calcHash(sourceFilePath) {
    const hash = createHash("sha256");

    return new Promise(resolve => {
      const sourceReadStream = createReadStream(sourceFilePath);
      
      sourceReadStream
        .on('data', (chank) => {
          hash.update(chank);
        })
        .on('end', () => {
          resolve(hash)
        });
    });
  };
};

export default File;
