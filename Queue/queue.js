module.exports = class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(data) {
        this.items.push(data);
    }

    dequeue() {
        if(this.isEmpty()) return false;
        return this.items.shift();
    }

    front() {
        if(this.isEmpty()) return false;
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        let str = '';
        for(var i = 0; i < this.items.length; i++) str += this.items[i] + ' ';
        return str;
    }
}
