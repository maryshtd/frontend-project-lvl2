const indent = (depth, space = 4) => ' '.repeat(depth * space - 2);

const stringify = (value, depth) => {
    if (typeof value !== 'object') {
        return value;
    }
    if (value === null) {
        return null;
    }
    const valueItems = Object
        .entries(value)
        .map(([key, value]) => `${indent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
    const result = ['{', ...valueItems, `${indent(depth)}  }`];
    return result.join('\n');
}


const stylish = (tree) => {
    const format = (data, depth) => {
        return data.map((item) => {
            const print = (value, depth, sign) => {
                const result = `${indent(depth)}${sign} ${item.key}: ${stringify(value, depth)}\n`;
                return result;
            }
            switch (item.type) {
                case 'unchanged':
                    return print(item.value, depth, ' ');
                case 'added':
                    return print(item.value, depth, '+');
                case 'removed':
                    return print(item.value, depth, '-');
                case 'updated':
                    return `${print(item.value1, depth, '-')}${print(item.value2, depth, '+')}`;
                case 'children':
                    return `${indent(depth)}  ${item.key}: {\n${format(item.children, depth + 1).join('')}${indent(depth)}  }\n`;
                default:
                    throw new Error(`Unknown type ${item.type}`);
            }
        });
    }
    return `{\n${format(tree, 1).join('')}}`;
};

export default stylish;