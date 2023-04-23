Synthesizing 5/10 solutions

=======
Suggestion 1

// 扩充类型类 HKT

export interface HKT<F, A> {
  [HKT_SYMBOL]: F;
}

export const HKT_SYMBOL = Symbol.for('HKT');

export interface Functor<F> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>;
}

export interface Apply<F> extends Functor<F> {
  ap<A, B>(ff: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>;
}

export interface Applicative<F> extends Apply<F> {
  of<A>(a: A): HKT<F, A>;
}

export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: (a: A) => HKT<F, B>, fa: HKT<F, A>): HKT<F, B>;
}

export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Extend<F> extends Functor<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, fa: HKT<F, A>): HKT<F, B>;
}

export interface Comonad<F> extends Extend<F> {
  extract<A>(fa: HKT<F, A>): A;
}

export interface Foldable<F> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B;
}

export interface Traversable<F> extends Functor<F>, Foldable<F> {
  traverse<G>(
    A: Applicative<G>,
    f: <A, B>(a: A) => HKT<G, B>,
    fa: HKT<F, A>
  ): HKT<G, HKT<F, B>>;
}

export interface Plus<F> extends Applicative<F> {
  zero: <A>() => HKT<F, A>;
  alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>;
}

export interface Alternative<F> extends Applicative<F>, Plus<F> {}

export interface Plus<F> extends Applicative<F> {
  zero: <A>() => HKT<F, A>;
  alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) =>

=======
Suggestion 2

// 扩充类型类 (Type Classes) 的定义
import { Kind } from './kind';

export interface Functor<F extends Kind> {
  map<A, B>(fa: Kind<F, A>, f: (a: A) => B): Kind<F, B>;
}

export interface Apply<F extends Kind> extends Functor<F> {
  ap<A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>): Kind<F, B>;
}

export interface Applicative<F extends Kind> extends Apply<F> {
  of<A>(a: A): Kind<F, A>;
}

export interface Chain<F extends Kind> extends Apply<F> {
  chain<A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>): Kind<F, B>;
}

export interface Monad<F extends Kind> extends Applicative<F>, Chain<F> {}

export interface Foldable<F extends Kind> {
  reduce<A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => B): B;
}

export interface Traversable<F extends Kind> extends Functor<F>, Foldable<F> {
  traverse<G extends Kind>(
    fa: Kind<F, any>,
    f: <A>(a: A) => Kind<G, A>
  ): Kind<G, Kind<F, any>>;
}

export interface Extend<F extends Kind> extends Functor<F> {
  extend<A, B>(ea: Kind<F, A>, f: (fa: Kind<F, A>) => B): Kind<F, B>;
}

export interface Comonad<F extends Kind> extends Extend<F> {
  extract<A>(ea: Kind<F, A>): A;
}

export interface Alt<F extends Kind> extends Functor<F> {
  alt<A>(fa: Kind<F, A>, that: () => Kind<F, A>): Kind<F, A>;
}

export interface Plus<F extends Kind> extends Alt<F> {
  zero(): Kind<F, never>;
}

export interface Alternative<F extends Kind> extends Applicative<F>, Plus<F> {}

export interface Bifunctor<F extends Kind> {
  bimap<A, B, C, D>(
    fab: Kind<F, A, B>,
    f: (a: A) => C,
    g: (b: B) => D
  ): Kind<F, C, D>;
}

export interface Profunctor

=======
Suggestion 3

// 扩充类型类 & 为类型类添加类型标签

import { _ } from './HKT';
import { $, HKT } from './HKT';
import { datatype, datatypeOf, kind } from './HKT';

export { _ };
export { $ };
export { HKT };
export { datatype };
export { datatypeOf };
export { kind };

// Path: src\typeclasses\HKT.ts
// HKT: Higher Kinded Type
// 用于标记类型类

=======
Suggestion 4

// 扩充类型类 HKT

=======
Suggestion 5

// 扩充类型类 HKT
// 用于类型推断
