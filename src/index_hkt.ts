import { map } from "./functor_feature";
import { XStream } from "./xstream_adt";
import "./xstream_functor_feature";
import { YStream } from "./ystream_adt";
import "./ystream_functor_feature";
import "./xstream_display_feature";
import { display } from "./display_feature";

console.log(
  map<"XStream", number, number>(a=>a+1, new XStream(1)),
  map<"YStream", number, number>(a=>a+1, new YStream(1)),
  display<"XStream", number>(new XStream(1))
)