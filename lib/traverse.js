/**
 * traverse - walk all of the nodes in a tree.
 */

export default function traverse(node, {enter, leave}) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
        case 'Operation':
        case 'Function':
            enter(node);
            node.args.forEach((arg) => traverse(arg, {enter, leave}));
            leave(node);
            break;

        // leaf nodes
        case 'Identifier':
        case 'Number':
            enter(node);
            leave(node);
            break;

        // irregular non-leaf nodes
        case 'Brackets':
            enter(node);
            traverse(node.content, {enter, leave});
            leave(node);
            break;

        default:
            throw new Error('unrecognized node');
    }
}
