import up from "./up.js";

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
      case 'ls':
      case 'cat':
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