"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CheckBox = (function () {
    function CheckBox(_a) {
        var target = _a.target, evtHandler = _a.evtHandler;
        this.target = target;
        this.evtHandler = evtHandler;
    }
    CheckBox.prototype.render = function () {
        this.target.append('input')
            .attr('type', 'checkbox')
            .on('change', this.evtHandler);
    };
    return CheckBox;
}());
exports.default = CheckBox;
//# sourceMappingURL=check-box.js.map