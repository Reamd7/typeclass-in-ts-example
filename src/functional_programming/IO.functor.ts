import { datatype } from '../typeclasses/index';
import { HKT, HKTSymbol } from '../typeclasses/index';
import { ApplyTrait } from './trait/apply.trait';
import { MappableTrait, map } from './trait/mappable.trait';

// for 运行时使用
@datatype('IOFunctor')
export class IOFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'IOFunctor';
  private constructor(public readonly unsafePerformIO: () => T) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: () => T): HKT<'IOFunctor', T> {
    return new IOFunctor<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['IOFunctor']: IOFunctor<A>;
  }
}

// =========== IOFunctor ===========
class IOFunctorMapper implements MappableTrait<'IOFunctor'> {
  map<A, B>(f: (a: A) => B, fa: HKT<'IOFunctor', A>): HKT<'IOFunctor', B> {
    return IOFunctor.of<B>(
      () => f(fa.unsafePerformIO())
    );
  }
}
declare module './trait/mappable.trait' {
  namespace MappableTrait {
    export let IOFunctor: IOFunctorMapper;
  }
}
MappableTrait.IOFunctor = new IOFunctorMapper();

// =========== Ap Functor ===========
class IOFunctorApplier implements ApplyTrait<'IOFunctor'> {
  ap<A, B>(f: HKT<'IOFunctor', (a: A) => B>, fa: HKT<'IOFunctor', A>): HKT<'IOFunctor', B> {
    return map(f.unsafePerformIO(), fa)
  }
}
declare module './trait/apply.trait' {
  namespace ApplyTrait {
    export let IOFunctor: IOFunctorApplier;
  }
}
ApplyTrait.IOFunctor = new IOFunctorApplier();