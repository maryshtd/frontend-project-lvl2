import yaml from 'js-yaml';

const parse = (data, fileExt) => {
  if (fileExt === 'json') {
    return JSON.parse(data);
  }
  if (fileExt === 'yaml' || fileExt === 'yml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported format: ${fileExt}`);
};

export default parse;
