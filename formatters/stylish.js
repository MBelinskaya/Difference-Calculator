import _ from 'lodash';

const indent = ' ';
const spacesCount = 4;

const beforeIndent = (depth) => indent.repeat(depth * spacesCount - 2);
const bracketIndent = (depth) => indent.repeat(depth * spacesCount - 4);
const currentIndent = (depth) => indent.repeat(depth * spacesCount);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent(depth)}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent(depth)}}`,
  ].join('\n');
};

const makeStylish = (treeNew) => {
  const iter = (tree, depth) => {
    const result = tree.map((data) => {
      switch (data.type) {
        case 'nested':
          return `${beforeIndent(depth)}  ${data.name}: ${stringify(iter(data.value, depth + 1), depth)}`;
        case 'deleted':
          return `${beforeIndent(depth)}- ${data.name}: ${stringify(data.value, depth + 1)}`;
        case 'added':
          return `${beforeIndent(depth)}+ ${data.name}: ${stringify(data.value, depth + 1)}`;
        case 'changed':
          return [
            `${beforeIndent(depth)}- ${data.name}: ${stringify(data.value1, depth + 1)}`,
            `${beforeIndent(depth)}+ ${data.name}: ${stringify(data.value2, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${beforeIndent(depth)}  ${data.name}: ${stringify(data.value, depth + 1)}`;
        default: {
          throw new Error(`"${data.type}" unknown extension`); }
      }
    });
    return [
      '{',
      ...result,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(treeNew, 1);
};

export default makeStylish;
