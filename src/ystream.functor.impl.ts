import { $ } from './typeclasses/index';
import { Functor } from './functor.trait';
import { YStream } from './ystream.adt';

class YStreamFunctor implements Functor<'YStream'> {
  map<A, B>(f: (a: A) => B, fa: $<'YStream', A>): $<'YStream', B> {
    return YStream.of(f(fa.value));
  }
}

declare module '@hkt' {
  interface _<A> {
    YStream: YStream<A>;
  }
}

declare module './functor.trait' {
  namespace Functor {
    export let YStream: YStreamFunctor;
  }
}

Functor.YStream = new YStreamFunctor();
