import os from 'os';
import fs from 'fs/promises'; 

class Command {
  constructor(args) {
    this._args = args || {};

    if (new.target === Command) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    this._currentDirPath = os.homedir();
  };

  async checkDirectory(pathDir) {
    try {
      const lstat = await fs.lstat(pathDir);
    
      if (!lstat.isDirectory()) {
        throw new Error('Invalid input: Directory was not found!');
      }
    } catch (err) {
      throw new Error(`Invalid input: ${err.message}`);
    }
  };
  
  async setDirPath(pathDir) {
    await this.checkDirectory(pathDir);
    
    this._currentDirPath = pathDir;
    return this;
  };

  getDirPath() {
    return this._currentDirPath;
  };

  checkArguments() {
    return true;
  };

  async runCommand() {
    this.checkArguments();
    await this.run();
    return this;
  };

  async checkFilePath(sourceFilePath) {
    try {
      const stat = await fs.lstat(sourceFilePath);

      if (!stat.isFile()) {
        throw Error('File not found!');
      }
    } catch (err) {
        throw new Error(`Invalid input: ${err.message}`);
    }
  };

  prepareArguments(data) {
    const args = data.reduce((collector, arg) => {
      arg = arg.trim();

      if (arg) {
        collector.push(arg);
      }

      return collector;
    }, []);

    return args;
  };
};

export default Command;
