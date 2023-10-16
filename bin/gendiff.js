#!/usr/bin/env node

import { program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

// program.command('join')
//   .description('Команда соединяет две строки в одну')
//   .argument('<first>', 'первая строка')
//   .argument('<second>', 'вторая строка')
//   .option('-c, --connector <type>', 'соединительная строка', '')

program.parse();