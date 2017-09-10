"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function collision(subject, objects, distance) {
    return objects.reduce(function (hit, object) {
        if (hit) {
            return hit;
        }
        return distance(object.x, object.y, subject.x, subject.y) === 0;
    }, false);
}
exports.default = collision;
//# sourceMappingURL=collision.js.map