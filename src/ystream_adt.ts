import { datatype } from "./typeclasses/index";

@datatype("YStream")
export class YStream<T> {
    YValue: T;
    constructor(value: T) {
        this.YValue = value
    }
}