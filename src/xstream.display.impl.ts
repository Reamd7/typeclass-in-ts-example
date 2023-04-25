import { HKT } from './typeclasses/index';
import { Display } from './display.trait';
import { XStream } from './xstream.adt';

class XStreamDisplay implements Display<'XStream'> {
  print<A>(fa: HKT<'XStream', A>): string {
    console.log('console display', fa.value);
    return String(fa.value);
  }
}

declare module '@hkt' {
  interface _<A> {
    XStream: XStream<A>;
  }
}

declare module './display.trait' {
  namespace Display {
    export let XStream: XStreamDisplay;
  }
}

Display.XStream = new XStreamDisplay();
