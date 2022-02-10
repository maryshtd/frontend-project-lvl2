import * as fs from 'fs';
import path from 'path';
import getTree from './getTree.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const extractFormat = (filename) => path.extname(filename).slice(1);
const readFile = (fileName) => path.resolve(process.cwd(), '__fixtures__', fileName);

const compareFiles = (fileName1, fileName2, formatName = 'stylish') => {
  const resolvedPath1 = readFile(fileName1);
  const resolvedPath2 = readFile(fileName2);
  const extension1 = extractFormat(resolvedPath1);
  const extension2 = extractFormat(resolvedPath2);
  const data1 = parse(fs.readFileSync(resolvedPath1, 'utf-8'), extension1);
  const data2 = parse(fs.readFileSync(resolvedPath2, 'utf-8'), extension2);

  const tree = getTree(data1, data2);
  return format(formatName, tree);
};

export default compareFiles;
