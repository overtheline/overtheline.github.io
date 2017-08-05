"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function collision(subject, objects) {
    return objects.reduce(function (hit, object) {
        if (hit) {
            return hit;
        }
        return object.x === subject.x && object.y === subject.y;
    }, false);
}
exports.default = collision;
//# sourceMappingURL=collision.js.map