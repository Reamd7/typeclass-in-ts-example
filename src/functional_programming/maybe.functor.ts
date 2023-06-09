import { datatype } from '../typeclasses/index';
import { HKT, HKTSymbol } from '../typeclasses/index';
import { MappableTrait, map } from './trait/mappable.trait';
import { ApplyTrait } from './trait/apply.trait';

// for 运行时使用
@datatype('MayBeFunctor')
export class MayBeFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'MayBeFunctor';
  private constructor(public readonly value: T | null) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: T | null): HKT<'MayBeFunctor', T> {
    return new MayBeFunctor<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['MayBeFunctor']: MayBeFunctor<A>;
  }
}

// =========== MayBeMapper ===========
class MayBeFunctorMappable implements MappableTrait<'MayBeFunctor'> {
  map<A, B>(f: (a: A) => B, fa: HKT<'MayBeFunctor', A>): HKT<'MayBeFunctor', B> {
    if (fa.value === null) return fa as HKT<'MayBeFunctor', B>;
    return MayBeFunctor.of<B>(f(fa.value));
  }
}
declare module './trait/mappable.trait' {
  namespace MappableTrait {
    export let MayBeFunctor: MayBeFunctorMappable;
  }
}
MappableTrait.MayBeFunctor = new MayBeFunctorMappable();

// =========== Ap Functor ===========
class MayBeApply implements ApplyTrait<'MayBeFunctor'> {
  ap<A, B>(f: HKT<'MayBeFunctor', (a: A) => B>, fa: HKT<'MayBeFunctor', A>): HKT<'MayBeFunctor', B> {
    if (!f.value) return MayBeFunctor.of<B>(null)
    return map(f.value, fa)
  }
}
declare module './trait/apply.trait' {
  namespace ApplyTrait {
    export let MayBeFunctor: MayBeApply;
  }
}
ApplyTrait.MayBeFunctor = new MayBeApply();