import { $ } from "./typeclasses/index";
import { Functor } from "./functor_feature";
import { XStream } from "./xstream_adt";

export class XStreamFunctor implements Functor<"XStream"> {
    map<A, B>(f: (a: A) => B, fa: $<"XStream", A>): $<"XStream", B> {
       return new XStream(f(fa.value))
    }
}


declare module '@hkt' {
    interface _<A> {
      "XStream": XStream<A>
    }
}

declare module './functor_feature' {
    namespace Functor {
      export let XStream: XStreamFunctor
    }
}

Functor.XStream = new XStreamFunctor();
