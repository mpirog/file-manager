import os from 'os';

class Command {
  constructor(args) {
    this._args = args || {};

    if (new.target === Command) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }

    this._currentDirPath = os.homedir();
  }

  setDirPath(path) {
    this._currentDirPath = path;
  };

  getDirPath() {
    return this._currentDirPath;
  }

  checkArguments() {
    return true;
  };

  runCommand() {
    this.checkArguments();
    this.run();
    return this;
  };
};

export default Command;
