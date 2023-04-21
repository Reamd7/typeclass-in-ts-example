import { HKT, $, kind } from "./typeclasses/index";

export interface Functor<F extends HKT> {
  map<A, B>(f: (a: A) => B, fa: $<F, A>): $<F, B>;
}
type FunctorInstances = keyof typeof Functor;

export module Functor {
  declare const 你管我是什么东西我就占者这里告诉typescript我可以作为类型进行推导_在没有定义运算符的时候尤其重要: void;
}

export function map<F extends FunctorInstances, A = any, B = any>(
  f: (v: A) => B,
  fa: $<F, A>
): $<F, B> {
  return (<any>Functor[kind(fa) as F]).map(f, fa) as $<F, B>;
}
