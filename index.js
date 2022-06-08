import os from 'os';
// import path from 'path';
import readline from 'readline';
import { stdout as output, stdin as input } from 'process';

import { getUserName } from './src/user.js';
import CommandFactory from './src/CommandFactory.js';

const currentDerictory = os.homedir();
// const currentDerictory = 'd:/разное/corss-check/virtual-keyboard/';// todo remove

const userName = getUserName();

output.write(`Welcom to file Manager, ${userName}\n`);

const rl = readline.createInterface({ input, output });

const query = (dirPath) => {
  output.write(`You are currently in ${dirPath}\n`);

  rl.question(`${dirPath}:>> `, async (command) => {
    try {
      const inst = new CommandFactory(command).getInstance();
      
      await inst.setDirPath(dirPath);
      await inst.runCommand();

      dirPath = inst.getDirPath();

      query(dirPath);
    } catch(err) {
      output.write(`ERROR: ${err.message}\n`);

      query(dirPath);
    }
  });
};

query(currentDerictory);
