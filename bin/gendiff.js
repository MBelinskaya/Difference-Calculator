#!/usr/bin/env node

import { program } from 'commander';
import getParse from './parsers.js';
import fs from 'fs';
import path from 'path';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {

    const fullPath1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
    const fullPath2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

    const result1 = getParse(fullPath1);
    const result2 = getParse(fullPath2);
        return console.log(result1, result2);
    })

program.parse();