class Element {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

module.exports = class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let qElement = new Element(element, priority);
        let contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > qElement.priority) {
                this.items.splice(i, 0, qElement);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(qElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) return false;
        return this.items.shift();
    }

    front() {
        if (this.isEmpty()) return false;
        return this.items[0];
    }

    rear() {
        if (this.isEmpty()) return false;
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printPQueue() {
        let str = '';
        for (let i = 0; i < this.items.length; i++) str += this.items[i].element + ' ';
        return str;
    }
}
