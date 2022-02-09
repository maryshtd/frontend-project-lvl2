import plain from './plain.js';
import stylish from './stylish.js';

const printDiff = (format, data) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error('Format is not supported');
  }
};

export default printDiff;
