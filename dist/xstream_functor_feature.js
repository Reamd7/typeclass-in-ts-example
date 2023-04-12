"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XStreamFunctor = void 0;
const functor_feature_1 = require("./functor_feature");
const xstream_adt_1 = require("./xstream_adt");
class XStreamFunctor {
    map(f, fa) {
        return new xstream_adt_1.XStream(f(fa.value));
    }
}
exports.XStreamFunctor = XStreamFunctor;
functor_feature_1.Functor.XStream = new XStreamFunctor();
