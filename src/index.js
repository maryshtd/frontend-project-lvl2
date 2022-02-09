import * as fs from 'fs';
import path from 'path';
import getTree from './getTree.js'
import printDiff from './formatters/index.js'
import parse from './parsers.js';

const extractFormat = (filename) => path.extname(filename).slice(1);

const compareFiles = (fileName1, fileName2, format = 'stylish') => {
    const resolvedPath1 = path.resolve(process.cwd(), '__fixtures__', fileName1);
    const resolvedPath2 = path.resolve(process.cwd(), '__fixtures__', fileName2);
    const extension1 = extractFormat(resolvedPath1);
    const extension2 = extractFormat(resolvedPath2);
    let data1 = parse(fs.readFileSync(resolvedPath1, 'utf-8'), extension1);
    let data2 = parse(fs.readFileSync(resolvedPath2, 'utf-8'), extension2);

    const tree = getTree(data1, data2);
    return printDiff(format, tree);
};  

export default compareFiles;