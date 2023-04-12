"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class Xstream {
    constructor(v) {
        this.value = v;
    }
}
// 函数式中的这个 Mapable 接口就叫做 Functor type class
class XstreamFunctor {
    map(f, fa) {
        return new Xstream(f(fa.value));
    }
}
// 但是, 用起来好难看, 每次用 map 还要 new 这么个 Functor 出来, 比如
const element = new XstreamFunctor().map(a => a + 1, new Xstream(1));
// 但是目标 map 的实现是这样的，但是现在这样是不行滴...
// function map<F extends FunctorInstance, A, B>(f: (v: A) => B, fa: $<F, A>) $<F, B> {
//   return new Functor<F>().map(f, fa)
// }
function datatype(name) {
    return (constructor) => {
        Reflect.defineMetadata('design:type', name, constructor);
    };
}
function kind(target) {
    return Reflect.getMetadata('design:type', target.constructor);
}
