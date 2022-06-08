import os from 'os';
// import path from 'path';
import readline from 'readline';
import { stdout as output, stdin as input } from 'process';

import { getUserName } from './src/user.js';
import CommandFactory from './src/CommandFactory.js';

const currentDerictory = os.homedir();

const userName = getUserName();

output.write(`Welcom to file Manager, ${userName}\n`);

const rl = readline.createInterface({ input, output });

const query = async (currentDerictory) => {
  output.write(`You are currently in ${currentDerictory}\n`);

  rl.question(`${currentDerictory}:>> `, (command) => {
    try {
      const inst = new CommandFactory(command).getInstance();
      
      inst.setDirPath(currentDerictory);
      inst.runCommand();

      currentDerictory = inst.getDirPath();

      query(currentDerictory);
    } catch(err) {
      output.write(`${err.message}\n`)

      query(currentDerictory);
    }
  });
};

query(currentDerictory);
