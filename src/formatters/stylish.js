import _ from 'lodash';

const getIndent = (depth, indent = ' ', spacesCount = 4) => {
  const result = indent.repeat(depth * spacesCount - 2);
  return result;
};

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${getIndent(depth)}      ${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIndent(depth)}  }`,
  ].join('\n');
};

const makeStylish = (treeNew) => {
  const iter = (tree, depth) => {
    const result = tree.map((data) => {
      switch (data.type) {
        case 'nested':
          return `${getIndent(depth)}  ${data.name}: {\n${iter(data.value, depth + 1).join('\n')}\n  ${getIndent(depth)}}`;
        case 'deleted':
          return `${getIndent(depth)}- ${data.name}: ${stringify(data.value, depth)}`;
        case 'added':
          return `${getIndent(depth)}+ ${data.name}: ${stringify(data.value, depth)}`;
        case 'changed':
          return [`${getIndent(depth)}- ${data.name}: ${stringify(data.value1, depth)}`, `${getIndent(depth)}+ ${data.name}: ${stringify(data.value2, depth)}`].join('\n');
        case 'unchanged':
          return `${getIndent(depth)}  ${data.name}: ${stringify(data.value, depth)}`;
        default: {
          throw new Error(`"${data.type}" unknown extension`); }
      }
    });
    return result;
  };
  return `{\n${iter(treeNew, 1).join('\n')}\n}`;
};

export default makeStylish;
