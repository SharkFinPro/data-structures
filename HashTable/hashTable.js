module.exports = class HashTable {
    constructor(limit) {
        this.limit = limit || 8;
        this.storage = new Map();
        this.count = 0;
    }

    hashCode(max) {
        var hash = 0;
        if (!this.length) return hash;
        for (let i = 0; i < this.length; i++) {
            char = this.charCodeAt(i);
            hash = ((hash<<5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(max ? hash%max : hash);
    }

    add(key, value) {
        let index = this.hashCode(key);
        let tuple = [key, value];
        let bucket = this.storage.get(index);
        if (bucket) {
            for (var i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) bucket[i][1] = value;
                else bucket.push(tuple);
            }
        } else this.storage.set(index, [tuple]);
    }

    retrieve(key) {
        let bucket = this.storage.get(this.hashCode(key));
        for (var i = 0; i < bucket.length; i++) if (bucket[i][0] === key) return bucket[i][1];
    }
}
