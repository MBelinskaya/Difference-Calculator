import fs from 'fs';
import path from 'path';
import generteDifference from './generteDifference.js';
import formatSelection from './formatters/index.js';
import getParsedData from './parser.js';

const getData = (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath));
  const extension = path.extname(filepath).slice(1);
  return getParsedData(file, extension);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const newTree = generteDifference(getData(filepath1), getData(filepath2));
  return formatSelection(newTree, format);
};

export default genDiff;
