import _ from 'lodash';

const indent = ' ';
// const indent = '.';
const spacesCount = 4;

const currentIndent = (depth) => indent.repeat(depth * spacesCount - 2);
const bracketIndent = (depth) => indent.repeat(depth * spacesCount - 4);
const withoutIndent = (depth) => indent.repeat(depth * spacesCount);

const stringify = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }
  const lines = Object
    .entries(currentValue)
    .map(([key, val]) => `${withoutIndent(depth)}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent(depth)}}`,
  ].join('\n');
};

const makeStylish = (treeNew) => {
  const iter = (tree, depth) => {
    const result = tree.map((data) => {
    // console.log(`!!!${currentIndent(depth)}${depth} ${data.type} ${data.name}`);

      switch (data.type) {
        case 'nested':
          return `${currentIndent(depth)}  ${data.name}: ${stringify(iter(data.value, depth + 1), depth)}`;
        case 'deleted':
          return `${currentIndent(depth)}- ${data.name}: ${stringify(data.value, depth + 1)}`;
        case 'added':
          return `${currentIndent(depth)}+ ${data.name}: ${stringify(data.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent(depth)}- ${data.name}: ${stringify(data.value1, depth + 1)}`,
            `${currentIndent(depth)}+ ${data.name}: ${stringify(data.value2, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${currentIndent(depth)}  ${data.name}: ${stringify(data.value, depth + 1)}`;
        default: {
          throw new Error(`"${data.type}" unknown extension`); }
      }
    }).join('\n');

    return `{\n${result}\n}`;
  };
  return iter(treeNew, 1);
};

export default makeStylish;
