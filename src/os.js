import { homedir, EOL, cpus, userInfo, arch } from 'os';
import Command from './Command.js';

class os extends Command {
  constructor(args) {
    super(args);
  }

  async run() {
    switch (this._args[0]) {
      case '--architecture':
        console.log(`CPU architecture: ${arch()}`);
        break;

      case '--username':
        console.log(`System user name: ${userInfo().username}`);
        break;

      case '--homedir':
        console.log(`Home directory: ${homedir()}`);
        break;

      case '--EOL':
        const marker = EOL.replace("\r", '\\r').replace("\n", '\\n');
        console.log(`Default system End-Of-Line: ${marker}`);
        break;
        
      case '--cpus':
        const cps = cpus();

        console.log(`Overall amount of CPUS: ${cps.length}`);
        
        cps.forEach((cpu) => {
          console.log(cpu.model);
        });
        
        break;

      default:
        throw new Error('no such attribute');
    }
    
    return true;
  }
}

export default os;
