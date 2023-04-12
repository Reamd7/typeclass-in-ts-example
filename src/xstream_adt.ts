import { datatype } from "./typeclasses/index";

@datatype("XStream")
export class XStream<T> {
    value: T;
    constructor(value: T) {
        this.value = value
    }
}