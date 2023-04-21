// Monad Trait

import { HKT, $, kind } from '../typeclasses/index';

export interface ApplyTrait<F extends HKT> {
  // unpack<A, B>(f: $<F, (a: A) => B>): (fc: $<F, A>) => $<F, B>;
  ap<A, B>(f: $<F, (a: A) => B>, fa: $<F, A>): $<F, B>;
}
type ApFunctorInstances = keyof typeof ApplyTrait;

export module ApplyTrait {
  declare const 你管我是什么东西我就占者这里告诉typescript我可以作为类型进行推导_在没有定义运算符的时候尤其重要: void;
}

export function ap<F extends ApFunctorInstances, A = any, B = any>(
  f: $<F, (a: A) => B>,
  fa: $<F, A>
): $<F, B> {
  return (<any>ApplyTrait[kind(fa) as F]).ap(f, fa) as $<F, B>;
}

export function lift<F extends ApFunctorInstances, B, C>(
  g: $<F, (a: B) => C>, fb: $<F, B>
) {
  return ap(g, fb)
};
export function liftA2<F extends ApFunctorInstances, B, C, D>(
  g: $<F, (a: B) => (b: C) => D>, fb: $<F, B>, fc: $<F, C>
) {
  return ap(ap(g, fb), fc)
};
export function liftA3<F extends ApFunctorInstances, B, C, D, E>(
  g: $<F, (a: B) => (b: C) => (c: D) => E>, fb: $<F, B>, fc: $<F, C>, fd: $<F, D>
) {
  return ap(ap(ap(g, fb), fc), fd)
};
