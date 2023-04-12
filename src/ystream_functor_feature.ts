import { $ } from "./typeclasses/index";
import { Functor } from "./functor_feature";
import { YStream } from "./ystream_adt";

export class YStreamFunctor implements Functor<"YStream"> {
    map<A, B>(f: (a: A) => B, fa: $<"YStream", A>): $<"YStream", B> {
       return new YStream(f(fa.YValue))
    }
}


declare module '@hkt' {
    interface _<A> {
      "YStream": YStream<A>
    }
}

declare module './functor_feature' {
    namespace Functor {
      export let YStream: YStreamFunctor
    }
}

Functor.YStream = new YStreamFunctor();
