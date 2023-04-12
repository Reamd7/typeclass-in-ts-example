import { HKT, $, kind } from "./typeclasses/index";

export interface Display<F extends HKT> {
  print<A>(fa: $<F, A>): string;
}
type DisplayInstances = keyof typeof Display;

export module Display {
  declare const 你管我是什么东西我就占者这里告诉typescript我可以作为类型进行推导: void;
}

export function display<F extends DisplayInstances, A = any>(
  fa: $<F, A>
): string {
  return (<any>Display[kind(fa) as F]).print(fa);
}
