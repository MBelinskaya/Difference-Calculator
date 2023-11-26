// import fs from 'fs';
// import { test, expect } from '@jest/globals';
import getGenDiff from '../index';

test('gendiff', () => {
  expect(getGenDiff('filepath1.json', 'filepath2.json')).toEqual(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
      }`);
});
