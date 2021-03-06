#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import compareFiles from '../src/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => {
    console.log(compareFiles(filepath1, filepath2, format));
  });
program.parse();
