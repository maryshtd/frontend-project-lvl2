import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';

const expectedResult = 
`{
  - follow : false
    host : hexlet.io
  - proxy : 123.234.53.22
  - timeout : 50
  + timeout : 20
  + verbose : true
}`;

test('check difference in json', () => {

    expect(compareFiles('file1.json','file2.json')).toEqual(expectedResult);
})

test('check difference in yml', () => {
  expect(compareFiles('file1.yml','file2.yml')).toEqual(expectedResult);
})