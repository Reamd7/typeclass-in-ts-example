import { HKT, datatype, HKTSymbol } from './typeclasses/index';

@datatype('YStream')
export class YStream<T> {
  readonly [HKTSymbol]!: 'YStream';
  private constructor(public readonly value: T) {}
  static of<T>(value: T): HKT<'YStream', T> {
    return new YStream<T>(value);
  }
}
