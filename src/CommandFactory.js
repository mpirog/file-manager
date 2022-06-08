import up from "./up.js";
import cd from "./cd.js";
import ls from "./ls.js";
import cat from "./cat.js";

class CommandFactory {
  constructor(param) {
    const params = param.split(' ');
    this._command = params[0];
    this._args = params.splice(1);
  }

  getInstance() {
    switch (this._command) {
      case 'up':
        return new up(this._args);

      case 'cd':
        return new cd(this._args);

      case 'ls':
        return new ls(this._args);

      case 'cat':
        return new cat(this._args);

      case 'add':
      case 'rn':
      case 'cp':
      case 'mv':
      case 'rm':
      case 'os':
      case 'hash':
      case 'compress':
      case 'decompress':

      default:
        throw new Error('Command was no defined')
    }
  }
}

export default CommandFactory;