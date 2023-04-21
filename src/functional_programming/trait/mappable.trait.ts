import { HKT, $, kind } from '../typeclasses/index';

export interface MappableTrait<F extends HKT> {
  map<A, B>(f: (a: A) => B, fa: $<F, A>): $<F, B>;
}
type FunctorInstances = keyof typeof MappableTrait;

export module MappableTrait {
  declare const 你管我是什么东西我就占者这里告诉typescript我可以作为类型进行推导_在没有定义运算符的时候尤其重要: void;
}

export function map<F extends FunctorInstances, A = any, B = any>(
  f: (v: A) => B,
  fa: $<F, A>
): $<F, B> {
  return (<any>MappableTrait[kind(fa) as F]).map(f, fa) as $<F, B>;
}

export function mapCurry<A, B>(f: (v: A) => B) {
  return function <F extends FunctorInstances>(fa: $<F, A>) {
    return (<any>MappableTrait[kind(fa) as F]).map(f, fa) as $<F, B>;
  };
}

export function mapCurry2<F extends FunctorInstances, A>(fa: $<F, A>) {
  return function <B>(f: (v: A) => B) {
    return (<any>MappableTrait[kind(fa) as F]).map(f, fa) as $<F, B>;
  };
}
