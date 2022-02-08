import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const expectedResult = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');

test('check difference in json', () => {
    expect(compareFiles('file1.json','file2.json')).toEqual(expectedResult);
})

test('check difference in yml', () => {
  expect(compareFiles('file1.yml','file2.yml')).toEqual(expectedResult);
})