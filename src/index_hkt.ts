import { map } from './functor.trait';
import { XStream } from './xstream.adt';
import './xstream.functor.impl';
import { YStream } from './ystream.adt';
import './ystream.functor.impl';
import './xstream.display.impl';
import { display } from './display.trait';
console.log(
  map((a) => a + 1, XStream.of(1)),
  map((a) => a + 1, YStream.of(1)),
  display(XStream.of(1))
);
