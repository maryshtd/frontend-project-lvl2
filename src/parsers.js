import yaml from 'js-yaml';

const parser = (data, fileExt) => {
    if (fileExt === 'json') {
        return JSON.parse(data);
    }
    if (fileExt === 'yaml' || fileExt === 'yml') {
        return yaml.load(data);
    }
};

export default parser;