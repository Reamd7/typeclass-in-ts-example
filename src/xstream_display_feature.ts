import { $ } from "./typeclasses/index";
import { Display } from "./display_feature";
import { XStream } from "./xstream_adt";

export class XStreamDisplay implements Display<"XStream"> {
    print<A>(fa: $<"XStream", A>): string {
      console.log(fa.value)
      return String(fa.value)
    }
}


declare module '@hkt' {
    interface _<A> {
      "XStream": XStream<A>
    }
}

declare module './display_feature' {
    namespace Display {
      export let XStream: XStreamDisplay
    }
}

Display.XStream = new XStreamDisplay();
