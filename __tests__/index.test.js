import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const cases = [
  {fileName1: 'file1.json', fileName2: 'file2.json', expectedFixture: 'resultStylish.txt', format: 'stylish'},
  {fileName1: 'file1.yml', fileName2: 'file2.yml', expectedFixture: 'resultStylish.txt', format: 'stylish'},
  {fileName1: 'file1.json', fileName2: 'file2.json', expectedFixture: 'resultPlain.txt', format: 'plain'},
  {fileName1: 'file1.yml', fileName2: 'file2.yml', expectedFixture: 'resultPlain.txt', format: 'plain'},
  {fileName1: 'file1.json', fileName2: 'file2.json', expectedFixture: 'resultJson.txt', format: 'json'},
  {fileName1: 'file1.yml', fileName2: 'file2.yml', expectedFixture: 'resultJson.txt', format: 'json'},
]

test.each(cases)('Compare $fileName1 and $fileName2 in $format format', ({fileName1, fileName2, expectedFixture, format}) => {
  const expected = fs.readFileSync(getFixturePath(expectedFixture), 'utf-8');
  expect(compareFiles(fileName1, fileName2, format)).toEqual(expected);
})
