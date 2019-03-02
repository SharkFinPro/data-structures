var HashTable = require('./hashTable.js');
var ht = new HashTable(8);
ht.add(100, 'hi');
console.log(ht.retrieve(100));
