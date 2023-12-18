import fs from 'fs';
import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each(
  [
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format: 'stylish',
      expected: 'expected_stylish_format.txt',
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format: 'plain',
      expected: 'expected_plain_format.txt',
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format: 'json',
      expected: 'expected_json_format.txt',
    },
    {
      fileName1: 'file1.json',
      fileName2: 'file2.json',
      format: undefined,
      expected: 'expected_stylish_format.txt',
    },
    {
      fileName1: 'file1.yml',
      fileName2: 'file2.yml',
      format: 'stylish',
      expected: 'expected_stylish_format.txt',
    },
    {
      fileName1: 'file1.yml',
      fileName2: 'file2.yml',
      format: 'plain',
      expected: 'expected_plain_format.txt',
    },
    {
      fileName1: 'file1.yml',
      fileName2: 'file2.yml',
      format: 'json',
      expected: 'expected_json_format.txt',
    },
    {
      fileName1: 'file1.yml',
      fileName2: 'file2.yml',
      format: undefined,
      expected: 'expected_stylish_format.txt',
    },
  ],
)('checks have passed $expected', ({
  fileName1, fileName2, format, expected,
}) => {
  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), format))
    .toEqual(fs.readFileSync(getFixturePath(expected), 'utf-8'));
});
