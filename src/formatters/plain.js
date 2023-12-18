import _ from 'lodash';

const stringify = (currentValue) => {
  if (_.isObject(currentValue)) {
    return '[complex value]';
  }
  if (_.isString(currentValue)) {
    return `'${currentValue}'`;
  }
  return currentValue;
};

const getPath = (paths) => paths.flat().join('.');

const makePlain = (treeNew) => {
  const iter = (tree, currentPath) => {
    const result = tree.map((data) => {
      const path = getPath([currentPath, data.name]);
      switch (data.type) {
        case 'nested':
          return iter(data.children, path);
        case 'deleted':
          return `Property '${path.slice(1)}' was removed`;
        case 'added':
          return `Property '${path.slice(1)}' was added with value: ${stringify(data.value)}`;
        case 'changed':
          return `Property '${path.slice(1)}' was updated. From ${stringify(data.value1)} to ${stringify(data.value2)}`;
        case 'unchanged':
          return null;
        default: {
          throw new Error(`"${data.type}" unknown type`); }
      }
    });
    return result.filter(Boolean).join('\n');
  };
  return iter(treeNew, '');
};

export default makePlain;
