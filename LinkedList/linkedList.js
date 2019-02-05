class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

module.exports = class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(data) {
        let node = new Node(data);
        let current;
        if(!this.head) this.head = node;
        else {
            current = this.head;
            while(current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    insertAt(data, index) {
        if (index > 0 && index > this.size) return false;
        let node = new Node(data);
        let curr = this.head;
        let prev;
        if (index === 0) {
            this.next = head;
            this.head = node;
        } else {
            curr = this.head;
            let it = 0;
            while (it < index) {
                it++;
                prev = curr;
                curr = curr.next;
            }
            node.next = curr;
            prev.next = node;
        }
        this.size++;
    }

    removeFrom(index) {
        if (index > 0 && index > this.size) return -1;
        else {
            var curr, prev, it = 0;
            curr = this.head;
            prev = curr;
            if (index === 0) this.head = curr.next;
            else {
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }
                prev.next = curr.next;
            }
            this.size--;
            return curr.data;
        }
    }

    removeData(data) {
        let current = this.head;
        let prev = null;
        while (current != null) {
            if (current.data === data) {
                if (prev == null) this.head = current.next;
                else prev.next = current.next;
                this.size--;
                return current.data;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    indexOf(data) {
        let count = 0;
        let current = this.head;
        while (current != null) {
            if (current.data === data) return count;
            count++;
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.size === 0;
    }

    listSize() {
        return this.size;
    }

    printList() {
        let curr = this.head;
        let str = '';
        while (curr) {
            str += curr.data + ' ';
            curr = curr.next;
        }
        console.log(str);
    }
}
