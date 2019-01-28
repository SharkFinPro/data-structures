class Point {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    resize(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return point.x >= this.x && point.y >= this.y && point.x <= this.x + this.w && point.y <= this.y + this.h;
    }

    intersects(rect) {
        return rect.x - rect.w < this.x + this.w || rect.x + rect.w > this.x - this.w || rect.y - rect.h < this.y + this.h || rect.y + rect.h > this.y - this.h;
    }
}

class QuadTree {
    constructor(boundary) {
        this.capacity = 4;
        this.points = [];
        this.boundary = boundary;
    }

    insert(point) {
        if (!this.boundary.contains(point)) return false;
        if (this.points.length < this.capacity && !this.northWest) return this.points.push(point);
        if (!this.northWest) this.subDivide();
        if (this.northWest.insert(point)) return true;
        if (this.northEast.insert(point)) return true;
        if (this.southWest.insert(point)) return true;
        if (this.southEast.insert(point)) return true;
        return false;
    }

    query(range) {
        let points = [];
        if (!this.boundary.intersects(range)) return points;
        for (let i = 0; i < this.points.length; i++) {
            if(range.contains(this.points[i])) {
                points.push(this.points[i]);
            }
        }
        if (!this.northWest) return points;
        points = points.concat(this.northWest.query(range));
        points = points.concat(this.northEast.query(range));
        points = points.concat(this.southWest.query(range));
        points = points.concat(this.southEast.query(range));
        return points;
    }

    queryAll() {
        return this.query(this.boundary);
    }

    remove(id) {
        let point = this.points.find(p => p.id === id);
        if (point) return this.points.splice(this.points.indexOf(point), 1);
        if (!this.northWest) return false;
        if (this.northWest.remove(id)) {
            this.unDivide();
            return true;
        }
        if (this.northEast.remove(id)) {
            this.unDivide();
            return true;
        }
        if (this.southWest.remove(id)) {
            this.unDivide();
            return true;
        }
        if (this.southEast.remove(id)) {
            this.unDivide();
            return true;
        }
        return false;
    }

    unDivide() {
        if(this.northWest.points.length !== 0 || this.northWest.points.length !== 0 || this.northWest.points.length !== 0 || this.northWest.points.length !== 0) return false;
        delete this.northWest;
        delete this.northEast;
        delete this.southWest;
        delete this.southEast;
    }

    subDivide() {
        this.northWest = new QuadTree(new Rect(this.boundary.x, this.boundary.y, this.boundary.w / 2, this.boundary.h / 2));
        this.northEast = new QuadTree(new Rect(this.boundary.x + this.boundary.w / 2, this.boundary.y, this.boundary.w / 2, this.boundary.h / 2));
        this.southWest = new QuadTree(new Rect(this.boundary.x, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2));
        this.southEast = new QuadTree(new Rect(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2));
    }
}

module.exports = { Point, Rect, QuadTree };
