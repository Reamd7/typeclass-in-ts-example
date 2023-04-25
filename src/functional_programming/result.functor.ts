import { datatype } from '../typeclasses/index';
import { HKT, HKTSymbol } from '../typeclasses/index';
import { ApplyTrait } from './trait/apply.trait';
import { MappableTrait, map } from './trait/mappable.trait';

// for 运行时使用
@datatype('ResultFunctor')
export class ResultFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'ResultFunctor';
  private constructor(public readonly value: T | Error) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: T | Error): HKT<'ResultFunctor', T> {
    return new ResultFunctor<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['ResultFunctor']: ResultFunctor<A>;
  }
}

// =========== Result Mapper ===========
class ResultFunctorMappable implements MappableTrait<'ResultFunctor'> {
  map<A, B>(f: (a: A) => B, fa: HKT<'ResultFunctor', A>): HKT<'ResultFunctor', B> {
    if (fa.value instanceof Error) return fa as HKT<'ResultFunctor', B>;
    return ResultFunctor.of<B>(f(fa.value));
  }
}
declare module './trait/mappable.trait' {
  namespace MappableTrait {
    export let ResultFunctor: ResultFunctorMappable;
  }
}
MappableTrait.ResultFunctor = new ResultFunctorMappable();

// =========== Ap Functor ===========
class ResultApply implements ApplyTrait<'ResultFunctor'> {
  ap<A, B>(f: HKT<'ResultFunctor', (a: A) => B>, fa: HKT<'ResultFunctor', A>): HKT<'ResultFunctor', B> {
    if (f.value instanceof Error) return f as HKT<'ResultFunctor', B>
    return map(f.value, fa)
  }
}
declare module './trait/apply.trait' {
  namespace ApplyTrait {
    export let ResultFunctor: ResultApply;
  }
}
ApplyTrait.ResultFunctor = new ResultApply();