"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var game_1 = require("./game");
var pxWidth = 750;
var pxHeight = 400;
var tileWidth = 80;
var tileHeight = 40;
var gameConfig = {
    pxWidth: pxWidth, pxHeight: pxHeight, tileWidth: tileWidth, tileHeight: tileHeight,
};
var boardContainerStyle = {
    width: pxWidth,
    height: pxHeight,
};
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.componentDidMount = function () {
        this.game = new game_1.default(gameConfig);
        this.game.init();
    };
    App.prototype.render = function () {
        console.log('App render');
        return (React.createElement("div", { id: 'main' },
            React.createElement("div", { className: 'board-container', style: boardContainerStyle },
                React.createElement("svg", { id: 'svg-layer-0', className: 'board layer-0', width: pxWidth, height: pxHeight }),
                React.createElement("svg", { id: 'svg-layer-1', className: 'board layer-1', width: pxWidth, height: pxHeight })),
            React.createElement("div", { className: 'text-panel' },
                React.createElement("p", null, "Press 'space' to start and stop."))));
    };
    return App;
}(React.Component));
exports.default = App;
//# sourceMappingURL=app.js.map