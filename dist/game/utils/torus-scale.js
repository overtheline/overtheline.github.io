"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function torusScale(mod) {
    return function modScale(l) {
        return (l % mod) < 0 ? (l % mod) + mod : l % mod;
    };
}
exports.default = torusScale;
//# sourceMappingURL=torus-scale.js.map