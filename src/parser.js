import yaml from 'js-yaml';

const getParsedData = (data, ext) => {
  // console.log(typeof ext, `!!!${ext}!!`);
  switch (ext) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'stylish':
      return JSON.stringify(data, null, ' ');
    default:
      throw new Error(`"${ext}" unknown extension`);
  }
};

export default getParsedData;
