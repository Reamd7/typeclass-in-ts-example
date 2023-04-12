"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.map = exports.Functor = void 0;
const index_1 = require("./typeclasses/index");
var Functor;
(function (Functor) {
})(Functor = exports.Functor || (exports.Functor = {}));
function map(f, fa) {
    return Functor[(0, index_1.kind)(fa)].map(f, fa);
}
exports.map = map;
