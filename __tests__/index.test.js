import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8');
const expectedResultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8');


test('check difference in json - stylish', () => {
    expect(compareFiles('file1.json','file2.json')).toEqual(expectedResultStylish);
})

test('check difference in yml - stylish', () => {
  expect(compareFiles('file1.yml','file2.yml')).toEqual(expectedResultStylish);
})

test('check difference in json - plain', () => {
  expect(compareFiles('file1.json','file2.json', 'plain')).toEqual(expectedResultPlain);
})

test('check difference in yml - plain', () => {
  expect(compareFiles('file1.yml','file2.yml', 'plain')).toEqual(expectedResultPlain);
})