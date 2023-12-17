import makeStylish from './stylish.js';
import makePlain from './plain.js';

const formatSelection = (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylish(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default: {
      throw new Error(`"${format}" unknown format`); }
  }
};
export default formatSelection;
