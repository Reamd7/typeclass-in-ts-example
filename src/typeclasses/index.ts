// explicit typeclass definitions 
export interface _<A> {
  // Array: Array<A>;
}

export type HKTName = keyof _<any>;

export declare const HKTSymbol: unique symbol;
export type HKT<F extends HKTName, A> = _<A>[F] & {
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

export function kind<F extends HKTName>(target: HKT<F, any>): F {
  return datatypeOf(target) as F;
}

// datatype('Array')(Array)
// datatype('Object')(Object)
// datatype('Promise')(Promise)

function isPrimitive(a: any): boolean {
  return ['string', 'number', 'symbol', 'boolean'].indexOf(typeof a) >= 0;
}
// explain this interface 
export interface Functor<F extends HKTName> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>;
}

export interface Apply<F extends HKTName> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>;
}

export interface Applicative<F extends HKTName> extends Apply<F> {
  of<A>(a: A): HKT<F, A>;
}

export interface Chain<F extends HKTName> extends Apply<F> {
  chain<A, B>(f: (a: A) => HKT<F, B>, fa: HKT<F, A>): HKT<F, B>;
}

export interface Monad<F extends HKTName> extends Applicative<F>, Chain<F> {}

export interface Alt<F extends HKTName> extends Functor<F> {
  alt<A>(fx: HKT<F, A>, fy: HKT<F, A>): HKT<F, A>;
}

export interface Plus<F extends HKTName> extends Alt<F> {
  zero<A>(): HKT<F, A>;
}

export interface Alternative<F extends HKTName> extends Applicative<F>, Plus<F> {}

export interface Foldable<F extends HKTName> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B;
}

export interface Traversable<F extends HKTName> extends Functor<F>, Foldable<F> {
  traverse<G extends HKTName>(
    A: Applicative<G>
  ): <A, B>(f: (a: A) => HKT<G, B>, ta: HKT<F, A>) => HKT<G, HKT<F, B>>;
}