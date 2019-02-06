module.exports = class Stack {
    constructor() {
        this.items = [];
    }

    push(data) {
        this.items.push(data);
    }

    pop() {
        if (this.items.length === 0) return false;
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printStack() {
        let str = '';
        for (let i = 0; i < this.items.length; i++) str += this.items[i] + ' ';
        return str;
    }
}
