import makeStylish from "./stylish.js";
import makePlain from "./plain.js";

const formatSelection = (tree, format) => {
switch (format) {
    case 'stylish':
        return makeStylish(tree);
    case 'plain':
        return makePlain(tree);
}
};
export default formatSelection;