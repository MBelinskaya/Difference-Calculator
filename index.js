import fs from 'fs';
import path from 'path';
import getType from './src/getType.js';
import formatSelection from './formatters/index.js';
import getParsedData from './src/parser.js';

const readFile = (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath));
  const extension = path.extname(filepath).slice(1);
  return getParsedData(file, extension);
};

const getGenDiff = (file1, file2, format = 'stylish') => {
  const newTree = getType(readFile(file1), readFile(file2));
  return formatSelection(newTree, format);
};

export default getGenDiff;
