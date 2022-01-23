import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const extractFormat = (filename) => path.extname(filename).slice(1);

const compareFiles = (filePath1, filePath2) => {
    const resolvedPath1 = path.resolve(process.cwd(), '__fixtures__', filePath1);
    const resolvedPath2 = path.resolve(process.cwd(), '__fixtures__', filePath2);
    const ext1 = extractFormat(resolvedPath1);
    const ext2 = extractFormat(resolvedPath2);
    let data1 = {};
    let data2 = {};
    if (ext1 === ext2 && ext1 === 'json')
    {    
        data1 = JSON.parse(fs.readFileSync(resolvedPath1, 'utf-8'));
        data2 = JSON.parse(fs.readFileSync(resolvedPath2, 'utf-8'));
    }

    const keys = Object.keys({ ...data1, ...data2});
    const sortedKeys = _.sortBy(keys);
    let result = '{\n';
    sortedKeys.forEach((key) => {
        const value1 = data1[key];
        const value2 = data2[key];
        if (!_.has(data2, key)) {
            result += `  - ${key} : ${data1[key]}\n`;
        }
        if (_.has(data2, key) && _.has(data1, key) && value1 === value2) {
            result += `    ${key} : ${data1[key]}\n`;
        }
        if (_.has(data2, key)  && _.has(data1, key) && value1 !== value2) {
            result += `  - ${key} : ${data1[key]}\n`;
            result += `  + ${key} : ${data2[key]}\n`;
        }
        if (!_.has(data1, key)) {
            result += `  + ${key} : ${data2[key]}\n`;
        }
    });
    result += '}';
    return result;

};

export default compareFiles;