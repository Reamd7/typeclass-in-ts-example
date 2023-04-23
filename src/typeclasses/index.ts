// explicit typeclass definitions 
export interface _<A> {
  // Array: Array<A>;
}

export type HKT = keyof _<any>;

export declare const HKTSymbol: unique symbol;
export type $<F extends HKT, A> = _<A>[F] & {
  [HKTSymbol]: F;
};

import 'reflect-metadata';

export function datatype(name: string) {
  return (constructor: Function) => {
    Reflect.defineMetadata('design:type', name, constructor);
  };
}

export function datatypeOf(target: any): string {
  if (isPrimitive(target)) {
    return target.constructor.name;
  } else {
    let tag = Reflect.getMetadata('design:type', target.constructor);
    if (tag) return tag;
    throw new Error(
      `target ${target.constructor} is not a datatype, please decorate it with @datatype!`
    );
  }
}

export function kind<F extends HKT>(target: $<F, any>): F {
  return datatypeOf(target) as F;
}

// datatype('Array')(Array)
// datatype('Object')(Object)
// datatype('Promise')(Promise)

function isPrimitive(a: any): boolean {
  return ['string', 'number', 'symbol', 'boolean'].indexOf(typeof a) >= 0;
}
// explain this interface 
export interface Functor<F extends HKT> {
  map<A, B>(f: (a: A) => B, fa: $<F, A>): $<F, B>;
}

export interface Apply<F extends HKT> extends Functor<F> {
  ap<A, B>(fab: $<F, (a: A) => B>, fa: $<F, A>): $<F, B>;
}

export interface Applicative<F extends HKT> extends Apply<F> {
  of<A>(a: A): $<F, A>;
}

export interface Chain<F extends HKT> extends Apply<F> {
  chain<A, B>(f: (a: A) => $<F, B>, fa: $<F, A>): $<F, B>;
}

export interface Monad<F extends HKT> extends Applicative<F>, Chain<F> {}

export interface Alt<F extends HKT> extends Functor<F> {
  alt<A>(fx: $<F, A>, fy: $<F, A>): $<F, A>;
}

export interface Plus<F extends HKT> extends Alt<F> {
  zero<A>(): $<F, A>;
}

export interface Alternative<F extends HKT> extends Applicative<F>, Plus<F> {}

export interface Foldable<F extends HKT> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: $<F, A>): B;
}

export interface Traversable<F extends HKT> extends Functor<F>, Foldable<F> {
  traverse<G extends HKT>(
    A: Applicative<G>
  ): <A, B>(f: (a: A) => $<G, B>, ta: $<F, A>) => $<G, $<F, B>>;
}