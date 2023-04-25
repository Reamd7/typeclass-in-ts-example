// Monad Trait

import { HKTName, HKT, kind } from '../../typeclasses/index';

// 实现一个Trait 必须注册在全局的 HKTName 中
export interface ApplyTrait<F extends HKTName> {
  // unpack<A, B>(f: $<F, (a: A) => B>): (fc: $<F, A>) => $<F, B>;
  ap<A, B>(f: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>;
}
type ApFunctorInstances = keyof typeof ApplyTrait;

export module ApplyTrait {
  declare const 你管我是什么东西我就占者这里告诉typescript我可以作为类型进行推导_在没有定义运算符的时候尤其重要: void;
}

export function ap<F extends ApFunctorInstances, A = any, B = any>(
  f: HKT<F, (a: A) => B>,
  fa: HKT<F, A>
): HKT<F, B> {
  return (<any>ApplyTrait[kind(fa) as F]).ap(f, fa) as HKT<F, B>;
}

// ap(ap(a, b), c) => lift 的工具函数
export function lift<F extends ApFunctorInstances, B, C>(
  g: HKT<F, (a: B) => C>, fb: HKT<F, B>
) {
  return ap(g, fb)
};
export function liftA2<F extends ApFunctorInstances, B, C, D>(
  g: HKT<F, (a: B) => (b: C) => D>, fb: HKT<F, B>, fc: HKT<F, C>
) {
  return ap(ap(g, fb), fc)
};
export function liftA3<F extends ApFunctorInstances, B, C, D, E>(
  g: HKT<F, (a: B) => (b: C) => (c: D) => E>, fb: HKT<F, B>, fc: HKT<F, C>, fd: HKT<F, D>
) {
  return ap(ap(ap(g, fb), fc), fd)
};
export function liftA4<F extends ApFunctorInstances, B, C, D, E, G>(
  g: HKT<F, (a: B) => (b: C) => (c: D) => (e: E) => G>, fb: HKT<F, B>, fc: HKT<F, C>, fd: HKT<F, D>, fg: HKT<F, E>
) {
  return ap(ap(ap(ap(g, fb), fc), fd), fg)
};
