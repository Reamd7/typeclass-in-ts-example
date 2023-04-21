import { datatype } from '../typeclasses/index';
import { $, HKTSymbol } from '../typeclasses/index';
import { MappableTrait } from './trait/mappable.trait';
import { ApplyTrait } from './trait/apply.trait';

// for 运行时使用
@datatype('Identity')
export class Identity<T> {
  // for 编译期使用, 运行时没有这个值 也不需要定义
  [HKTSymbol]!: 'Identity';
  private constructor(public readonly value: T) {}
  // 将任意数据类型放入这个最小上下文, 并声明为高阶类型的具体子类型
  static of<T>(value: T): $<'Identity', T> {
    return new Identity<T>(value);
  }
}

declare module '@hkt' {
  interface _<A> {
    ['Identity']: Identity<A>;
  }
}

// =========== Functor ===========
class IdentityMappable implements MappableTrait<'Identity'> {
  map<A, B>(f: (a: A) => B, fa: $<'Identity', A>): $<'Identity', B> {
    return Identity.of<B>(f(fa.value));
  }
}
declare module './trait/mappable.trait' {
  namespace MappableTrait {
    export let Identity: IdentityMappable;
  }
}
MappableTrait.Identity = new IdentityMappable();

// =========== Ap Functor ===========
class IdentityApply implements ApplyTrait<'Identity'> {
  ap<A, B>(f: $<'Identity', (a: A) => B>, fa: $<'Identity', A>): $<'Identity', B> {
    return Identity.of(f.value(fa.value))
  }
}
declare module './trait/apply.trait' {
  namespace ApplyTrait {
    export let Identity: IdentityApply;
  }
}
ApplyTrait.Identity = new IdentityApply();
