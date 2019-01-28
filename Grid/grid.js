"use strict";
module.exports = class Grid {
    constructor(binSize) {
        this.binSize = binSize;
        this.grid = new Map();
    }

    insert(data, rect) {
        var pMin = this.getKey(rect.minX, rect.minY),
            pMax = this.getKey(rect.maxX, rect.maxY);
        for (var x = pMin.x; x <= pMax.x; x++) {
            for (var y = pMin.y; y <= pMax.y; y++) {
                let key = x + "-" + y;
                if (!this.grid.has(key)) this.grid.set(key, []);
                this.grid.get(key).push(data)
            }
        }
        data._hashPMin = pMin;
        data._hashPMax = pMax;
    }

    delete(data) {
        for (var x = data._hashPMin.x; x <= data._hashPMax.x; x++) {
            for (var y = data._hashPMin.y; y <= data._hashPMax.y; y++) {
                let key = x + "-" + y;
                let cell = this.grid.get(key);
                let index = cell.indexOf(data);
                if (index != -1) cell.splice(index, 1);
            }
        }
        data._hashPMin = data._hashPMax = null;
    }

    retrieve(rect) {
        var results = new Map();
        var pMin = this.getKey(rect.minX, rect.minY),
            pMax = this.getKey(rect.maxX, rect.maxY);
        for (var x = pMin.x; x <= pMax.x; x++) {
            for (var y = pMin.y; y <= pMax.y; y++) {
                var key = x + "-" + y;
                var cell = this.grid.get(key);
                if (cell) {
                    for (var i = 0; i < cell.length; i++) {
                        results.set(cell[i].id, cell[i]);
                    }
                }
            }
        }
        return results;
    }

    update(data, rect) {
        var pMin = this.getKey(rect.minX, rect.minY),
            pMax = this.getKey(rect.maxX, rect.maxY);
        if (pMin.x !== data._hashPMin.x || pMin.y !== data._hashPMin.y || pMax.x !== data._hashPMax.x || pMax.y !== data._hashPMax.y) {
            this.delete(data);
            this.insert(data, rect);
        }
    }

    getKey(x, y) {
        return {x: Math.floor(x / this.binSize), y: Math.floor(y / this.binSize)};
    }
}
