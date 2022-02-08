import * as fs from 'fs';
import path from 'path';
import getTree from './getTree.js'
import stylish from './stylish.js'
import parser from './parsers.js';

const extractFormat = (filename) => path.extname(filename).slice(1);

const compareFiles = (filePath1, filePath2, format = 'stylish') => {
    const resolvedPath1 = path.resolve(process.cwd(), '__fixtures__', filePath1);
    const resolvedPath2 = path.resolve(process.cwd(), '__fixtures__', filePath2);
    const ext1 = extractFormat(resolvedPath1);
    const ext2 = extractFormat(resolvedPath2);
    let data1 = parser(fs.readFileSync(resolvedPath1, 'utf-8'), ext1);
    let data2 = parser(fs.readFileSync(resolvedPath2, 'utf-8'), ext2);

    const tree = getTree(data1, data2);
    if (format === 'stylish') {
        return stylish(tree);
    }
    return;
};  

export default compareFiles;