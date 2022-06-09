import os from 'os';
// import { clc } from 'cli-color';

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
  console.log('\x1b[33m%s\x1b[0m', `You are currently in ${dirPath}`);

  rl.question(`${dirPath}:>> `, async (command) => {
    try {
      const inst = new CommandFactory(command).getInstance();
      
      await inst.setDirPath(dirPath);
      await inst.runCommand();

      dirPath = inst.getDirPath();

      query(dirPath);
    } catch (err) {
      console.log('\x1b[31m%s\x1b[0m', `ERROR: ${err.message}\n`);

      query(dirPath);
    }
  });
};

query(currentDerictory);
