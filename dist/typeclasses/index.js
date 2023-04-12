"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kind = exports.datatypeOf = exports.datatype = void 0;
require("reflect-metadata");
function datatype(name) {
    return (constructor) => {
        Reflect.defineMetadata('design:type', name, constructor);
    };
}
exports.datatype = datatype;
function datatypeOf(target) {
    if (isPrimitive(target)) {
        return target.constructor.name;
    }
    else {
        let tag = Reflect.getMetadata('design:type', target.constructor);
        if (tag)
            return tag;
        throw new Error(`target ${target.constructor} is not a datatype, please decorate it with @datatype!`);
    }
}
exports.datatypeOf = datatypeOf;
function kind(target) {
    return datatypeOf(target);
}
exports.kind = kind;
// datatype('Array')(Array)
// datatype('Object')(Object)
// datatype('Promise')(Promise)
function isPrimitive(a) {
    return ['string', 'number', 'symbol', 'boolean'].indexOf(typeof a) >= 0;
}
