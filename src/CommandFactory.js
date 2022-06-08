import up from "./up.js";
import cd from "./cd.js";
import ls from "./ls.js";
import cat from "./cat.js";
import add from "./add.js";
import rn from "./rn.js";
import cp from "./cp.js";
import mv from "./mv.js";
import rm from "./rm.js";

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
        return new add(this._args);

      case 'rn':
        return new rn(this._args);

      case 'cp':
        return new cp(this._args);

      case 'mv':
        return new mv(this._args);

      case 'rm':
        return new rm(this._args);

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