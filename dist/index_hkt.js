"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functor_feature_1 = require("./functor_feature");
const xstream_adt_1 = require("./xstream_adt");
require("./xstream_functor_feature");
const ystream_adt_1 = require("./ystream_adt");
require("./ystream_functor_feature");
console.log((0, functor_feature_1.map)(a => a + 1, new xstream_adt_1.XStream(1)), (0, functor_feature_1.map)(a => a + 1, new ystream_adt_1.YStream(1)));
