import { datatype } from '../typeclasses/index';
import { $, HKTSymbol } from '../typeclasses/index';
import { ApplyTrait } from './apply.trait';
import { MappableTrait } from './mappable.trait';

// for 运行时使用
@datatype('TaskFunctor')
export class TaskFunctor<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'TaskFunctor';
  private constructor(public readonly unsafePerformIO: () => Promise<T>) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: () => Promise<T>): $<'TaskFunctor', T> {
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
  map<A, B>(f: (a: A) => B, fa: $<'TaskFunctor', A>): $<'TaskFunctor', B> {
    return TaskFunctor.of<B>(
      () => fa.unsafePerformIO().then(f)
    );
  }
}
declare module './mappable.trait' {
  namespace MappableTrait {
    export let TaskFunctor: TaskFunctorMappable;
  }
}
MappableTrait.TaskFunctor = new TaskFunctorMappable();

// =========== Ap Functor ===========
class TaskApply implements ApplyTrait<'TaskFunctor'> {
  ap<A, B>(f: $<'TaskFunctor', (a: A) => B>, fa: $<'TaskFunctor', A>): $<'TaskFunctor', B> {
    return TaskFunctor.of(
      () => Promise.all([f.unsafePerformIO(), fa.unsafePerformIO()]).then(([f, a]) => f(a))
    )
  }
}
declare module './apply.trait' {
  namespace ApplyTrait {
    export let TaskFunctor: TaskApply;
  }
}
ApplyTrait.TaskFunctor = new TaskApply();