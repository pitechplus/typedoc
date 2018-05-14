"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Readme = (function () {
    function Readme(content, path, isRoot) {
        if (isRoot === void 0) { isRoot = false; }
        this._path = path;
        this._content = content;
        this._isRoot = isRoot;
    }
    Object.defineProperty(Readme.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Readme.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Readme.prototype, "isRoot", {
        get: function () {
            return this._isRoot;
        },
        enumerable: true,
        configurable: true
    });
    return Readme;
}());
exports.default = Readme;
//# sourceMappingURL=readme.js.map