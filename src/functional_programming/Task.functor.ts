import { datatype } from '../typeclasses/index';
import { HKT, HKTSymbol } from '../typeclasses/index';
import { ApplyTrait } from './trait/apply.trait';
import { MappableTrait } from './trait/mappable.trait';

// for 运行时使用
@datatype('TaskFunctor')
export class TaskFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'TaskFunctor';
  private constructor(public readonly unsafePerformIO: () => Promise<T>) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: () => Promise<T>): HKT<'TaskFunctor', T> {
    return new TaskFunctor<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['TaskFunctor']: TaskFunctor<A>;
  }
}

// =========== TaskFunctor ===========
class TaskFunctorMappable implements MappableTrait<'TaskFunctor'> {
  map<A, B>(f: (a: A) => B, fa: HKT<'TaskFunctor', A>): HKT<'TaskFunctor', B> {
    return TaskFunctor.of<B>(
      () => fa.unsafePerformIO().then(f)
    );
  }
}
declare module './trait/mappable.trait' {
  namespace MappableTrait {
    export let TaskFunctor: TaskFunctorMappable;
  }
}
MappableTrait.TaskFunctor = new TaskFunctorMappable();

// =========== Ap Functor ===========
class TaskApply implements ApplyTrait<'TaskFunctor'> {
  ap<A, B>(f: HKT<'TaskFunctor', (a: A) => B>, fa: HKT<'TaskFunctor', A>): HKT<'TaskFunctor', B> {
    return TaskFunctor.of(
      () => Promise.all([f.unsafePerformIO(), fa.unsafePerformIO()]).then(([f, a]) => f(a))
    )
  }
}
declare module './trait/apply.trait' {
  namespace ApplyTrait {
    export let TaskFunctor: TaskApply;
  }
}
ApplyTrait.TaskFunctor = new TaskApply();