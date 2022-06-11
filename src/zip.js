import path from 'path';
import fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import Command from './Command.js';
import { pipeline } from 'node:stream/promises';
import { BrotliCompress, BrotliDecompress } from 'zlib';

class zip extends Command {
  constructor(args, isCompressMode) {
    super(args);

    this._isCompressMode = isCompressMode;
  };

  async _makeDirectory(newPath) {
    try { 
      await fs.mkdir(newPath);
    } catch {} 
  };

  async _pipelineProcess(sourceFilePath, destinationFilePath, bzip) {
    const sourceReadStream = createReadStream(sourceFilePath);
    const destinationWriteStream = createWriteStream(destinationFilePath);

    await pipeline(
      sourceReadStream,
      bzip,
      destinationWriteStream
    );
  };

  async run() {
    const sourceFilePath = path.resolve(this._currentDirPath, this._args[0]);
    const newPath = path.join(this._currentDirPath, this._args[1] || '');
    
    await this._makeDirectory(newPath);

    let fileName = this._args[0];

    if (this._isCompressMode) {
      fileName = `${fileName}.br`;
    } else {
      const index = fileName.lastIndexOf('.br');

      if (index >= 0) {
        fileName = fileName.substring(0, fileName.lastIndexOf('.br'));
      }
    }

    const destinationFilePath = path.resolve(newPath, fileName);

    const bzip = this._isCompressMode ? BrotliCompress() : BrotliDecompress();
    
    try {
      await this._pipelineProcess(sourceFilePath, destinationFilePath, bzip);
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }

    return true;
  };
};

export default zip;
