const BinarySearchTree = require('./binarySearchTree.js');
const tree = new BinarySearchTree();
tree.insert(15);
tree.insert(25);
tree.insert(10);
tree.insert(7);
tree.insert(22);
tree.insert(17);
tree.insert(13);
tree.insert(5);
tree.insert(9);
tree.insert(27);

let root = tree.getRootNode();
console.log("inorder traversal");
tree.inorder(root);
console.log("postorder traversal");
tree.postorder(root);
console.log("preorder traversal");
tree.preorder(root);
