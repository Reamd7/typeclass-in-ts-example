import { datatype } from '../typeclasses/index';
import { $, HKTSymbol } from '../typeclasses/index';
import { MappableTrait } from './mappable.trait';

// for 运行时使用
@datatype('IOFunctor')
export class IOFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'IOFunctor';
  private constructor(public readonly unsafePerformIO: () => T) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: () => T): $<'IOFunctor', T> {
    return new IOFunctor<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['IOFunctor']: IOFunctor<A>;
  }
}

// =========== IOFunctor ===========
class IOFunctorMappable implements MappableTrait<'IOFunctor'> {
  map<A, B>(f: (a: A) => B, fa: $<'IOFunctor', A>): $<'IOFunctor', B> {
    return IOFunctor.of<B>(
      () => f(fa.unsafePerformIO())
    );
  }
}
declare module './mappable.trait' {
  namespace MappableTrait {
    export let IOFunctor: IOFunctorMappable;
  }
}
MappableTrait.IOFunctor = new IOFunctorMappable();
