import { HKT } from './typeclasses/index';
import { Functor } from './functor.trait';
import { XStream } from './xstream.adt';

class XStreamFunctor implements Functor<'XStream'> {
  map<A, B>(f: (a: A) => B, fa: HKT<'XStream', A>): HKT<'XStream', B> {
    return XStream.of(f(fa.value));
  }
}

declare module '@hkt' {
  interface _<A> {
    XStream: XStream<A>;
  }
}

declare module './functor.trait' {
  namespace Functor {
    export let XStream: XStreamFunctor;
  }
}

Functor.XStream = new XStreamFunctor();
