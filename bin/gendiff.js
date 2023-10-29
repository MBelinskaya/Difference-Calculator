#!/usr/bin/env node

import { program } from 'commander';
import getParsedData from './parse.js';
import fs from 'fs';
import path from 'path';
import getDiff from './getDiff.js';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {

    const fullPath1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
    const fullPath2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

    const parsedData1 = getParsedData(fullPath1);
    const parsedData2 = getParsedData(fullPath2);

    const diffResult = getDiff(parsedData1, parsedData2);

    const result = JSON.stringify(diffResult, (key, value) => {
        if (value === "deleted") return '-' + key + value
    
        return value;
    }, 2);

// 
    return console.log(result);

    })

program.parse();