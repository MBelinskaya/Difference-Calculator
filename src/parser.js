import yaml from 'js-yaml';

const getParsedData = (data, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`"${type}" unknown type`);
  }
};

export default getParsedData;
