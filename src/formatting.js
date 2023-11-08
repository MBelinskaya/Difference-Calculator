import _ from 'lodash';

const indent = ' ';
const spacesCount = 4;

const currentIndent = (depth) => indent.repeat(spacesCount * depth - 2);
const bracketIndent = (depth) => indent.repeat(spacesCount * depth - spacesCount);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);

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
          return `${currentIndent(depth)}  ${data.name}: {${iter(data.children, depth + 1).join('\n')}\n  ${stringify(depth)}}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${data.name}: ${stringify(data.value, depth)}`;
        case 'added':
          return `${currentIndent(depth)}+ ${data.name}: ${stringify(data.value, depth)}`;
        case 'changed':
          return [
            `${currentIndent(depth)}- ${data.name}: ${stringify(data.value1, depth)}`,
            `${currentIndent(depth)}+ ${data.name}: ${stringify(data.value2, depth)}`,
          ].join('\n');
        case 'unchanged':
          return `${currentIndent(depth)}  ${data.name}: ${stringify(data.value, depth)}`;
        default: {
          throw new Error(`"${data.type}" unknown extension`); }
      }
    }).join('\n');

    return `{\n${result}\n}`;
  };
  return iter(treeNew, 1);
};

export default makeStylish;
