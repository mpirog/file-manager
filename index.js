import os from 'os';
import readline from 'readline';
import { stdout as output, stdin as input } from 'process';

import { getUserName } from './src/user.js';
import CommandFactory from './src/CommandFactory.js';

const userName = getUserName();

const currentDerictory = os.homedir();

console.log('\x1b[36m%s\x1b[1m%s\x1b[0m', `Welcom to file Manager, `, `${userName}!`);

const rl = readline.createInterface({ input, output });

// ------ functions -----

const exitApp = () => {
  console.log('\x1b[36m%s\x1b[1m%s\x1b[0m', `\nThank you for using File Manager, `, `${userName}!`);
  process.exit(0);
};

const query = async (dirPath) => {
  console.log('\x1b[33m%s\x1b[32m%s\x1b[0m', `You are currently in `, dirPath);

  rl.question(`${dirPath}:>> `, async (command) => {
    if (command.toString().trim() === '.exit') {
      exitApp();
      return;
    }

    try {
      const inst = new CommandFactory(command).getInstance();
      
      await inst.setDirPath(dirPath);
      await inst.runCommand();

      dirPath = inst.getDirPath();

      await query(dirPath);
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', err.message);

      await query(dirPath);
    }
  });
};

rl.on('SIGINT', exitApp);

// ------ start ------
query(currentDerictory);
