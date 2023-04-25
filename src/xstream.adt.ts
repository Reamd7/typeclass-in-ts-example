import { HKT, datatype, HKTSymbol } from './typeclasses';

@datatype('XStream')
export class XStream<T> {
  readonly [HKTSymbol]!: 'XStream';
  private constructor(public readonly value: T) {}
  static of<T>(value: T): HKT<'XStream', T> {
    return new XStream<T>(value);
  }
}
