const printValue = (value) => {
  if (value === null) {
    return null;
  }
  if (value === true || value === false || value === 0) {
    return `${value}`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return `'${value}'`;
};

const plain = (tree) => {
  const format = (data, parentName) => data
    .filter((item) => item.type !== 'unchanged')
    .map((item) => {
      const printKey = parentName !== '' ? `${parentName}.${item.key}` : item.key;
      switch (item.type) {
        case 'added':
          return `Property '${printKey}' was added with value: ${printValue(item.value)}`;
        case 'removed':
          return `Property '${printKey}' was removed`;
        case 'updated':
          return `Property '${printKey}' was updated. From ${printValue(item.value1)} to ${printValue(item.value2)}`;
        case 'children':
          return `${format(item.children, printKey).join('\n')}`;
        default:
          throw new Error(`Unknown type ${item.type}`);
      };
    });
  return format(tree, '').join('\n');
};

export default plain;
