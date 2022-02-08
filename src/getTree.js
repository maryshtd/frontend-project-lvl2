import _ from 'lodash';

const getTree = (data1, data2) => {
    const keys = Object.keys({ ...data1, ...data2});
    const sortedKeys = _.sortBy(keys);
    return sortedKeys.map((key) => {
        const value1 = data1[key];
        const value2 = data2[key];
        if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
           return { action: 'children', key, children: getTree(value1, value2) };
        }
        if (!_.has(data2, key)) {
            return { action: 'removed', key, value: value1};
        }
        if (!_.has(data1, key)) {
            return { action: 'added', key, value: value2 };
        }
        if (value1 !== value2) {
            return {action: 'updated', key, value1: value1, value2: value2};
        }
        return { action: 'unchanged', key, value: value1};
    });
};

export default getTree;