#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/extensions
import getType from '../src/getType.js';
// eslint-disable-next-line import/extensions
import makeStylish from '../src/formatting.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const fullPath1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
    const fullPath2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));
    const parsedData1 = JSON.parse(fullPath1);
    const parsedData2 = JSON.parse(fullPath2);
    const diffResult = getType(parsedData1, parsedData2);

    return console.log((makeStylish(diffResult)));
  });

program.parse();
