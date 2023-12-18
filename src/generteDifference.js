import _ from 'lodash';

const generteDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const allKeys = _.sortBy(_.union(keys1, keys2));

  const result = allKeys.map((node) => {
    if (_.isObject(data1[node]) && _.isObject(data2[node])) {
      return { name: node, type: 'nested', children: generteDifference(data1[node], data2[node]) };
    }
    if (!Object.hasOwn(data1, node)) {
      return { name: node, type: 'added', value: data2[node] };
    }
    if (!Object.hasOwn(data2, node)) {
      return { name: node, type: 'deleted', value: data1[node] };
    }
    if (_.isEqual(data1[node], data2[node])) {
      return { name: node, type: 'unchanged', value: data1[node] };
    }
    if (!_.isEqual(data1[node], data2[node])) {
      return {
        name: node, type: 'changed', value1: data1[node], value2: data2[node],
      };
    }
    return result;
  });

  return result;
};

export default generteDifference;
