import { homedir, EOL, cpus, userInfo, arch } from 'os';
import Command from './Command.js';

class os extends Command {
  constructor(args) {
    super(args);
  };

  async run() {
    switch (this._args[0]) {
      case '--architecture':
        console.log('\x1b[32m%s\x1b[33m%s\x1b[0m', `CPU architecture: `, arch());
        break;

      case '--username':
        console.log('\x1b[32m%s\x1b[33m%s\x1b[0m', `System user name: `, userInfo().username);
        break;

      case '--homedir':
        console.log('\x1b[32m%s\x1b[33m%s\x1b[0m', `Home directory: `, homedir());
        break;

      case '--EOL':
        const marker = EOL.replace("\r", '\\r').replace("\n", '\\n');
        console.log('\x1b[32m%s\x1b[33m%s\x1b[0m', `Default system End-Of-Line: `, marker);
        break;
        
      case '--cpus':
        const cps = cpus();

        console.log('\x1b[32m%s\x1b[33m%s\x1b[0m', `Overall amount of CPUS: `, cps.length);
        
        cps.forEach((cpu) => {
          console.log('\x1b[35m%s\x1b[0m', cpu.model);
        });
        
        break;

      default:
        throw new Error('no such attribute');
    }
    
    return true;
  };
};

export default os;
