import { test, expect } from '@jest/globals';
import compareFiles from '../src/index.js';

test('check difference', () => {
    const expectedResult = 
      `{
  - follow : false
    host : hexlet.io
  - proxy : 123.234.53.22
  - timeout : 50
  + timeout : 20
  + verbose : true
}`;
    expect(compareFiles('file1.json','file2.json')).toEqual(expectedResult);
})