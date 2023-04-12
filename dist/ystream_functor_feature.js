"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YStreamFunctor = void 0;
const functor_feature_1 = require("./functor_feature");
const ystream_adt_1 = require("./ystream_adt");
class YStreamFunctor {
    map(f, fa) {
        return new ystream_adt_1.YStream(f(fa.YValue));
    }
}
exports.YStreamFunctor = YStreamFunctor;
functor_feature_1.Functor.YStream = new YStreamFunctor();
