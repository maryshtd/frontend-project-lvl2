const printValue = (value) => {
    if (value === null) {
        return null;
    }
    if (value === true || value === false) {
        return value;
    }
    if (typeof value === 'object') {
        return '[complex value]';
    } 
    return `'${value}'`;
};

const plain = (tree) => {
    const format = (data, parentName) => {
        return data.map((item) => {
            const printKey = parentName != '' ? `${parentName}.${item.key}` : item.key;
            switch (item.type) {
                case 'added':
                    return `Property '${printKey}' was added with value: ${printValue(item.value)}\n`;
                case 'removed':
                    return `Property '${printKey}' was removed\n`;
                case 'updated':
                    return `Property '${printKey}' was updated. From ${printValue(item.value1)} to ${printValue(item.value2)}\n`;
                case 'children':
                    return format(item.children, printKey).join('');
                case 'unchanged':
                    return;
                default:
                    throw new Error(`Unknown type ${item.type}`);
            }
        })
    }
    return format(tree, '').join('');
};

export default plain;