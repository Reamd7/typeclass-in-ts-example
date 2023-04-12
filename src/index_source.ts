import 'reflect-metadata'
// 借助interface合并的行为 可以实现一个类型字典
interface _<A> {}

type HKT = keyof _<any>;

// 模拟 HKT 类型
type $<F extends HKT, A> = _<A>[F]

interface Functor<F extends HKT> {
  map<A, B>(f: (a: A) => B, fa: $<F, A>): $<F, B>
}

class Xstream<T> {
  value: T
  constructor(v: T) {
    this.value = v
  }
}

interface _<A> {
    "Xstream": Xstream<A>
}

// 函数式中的这个 Mapable 接口就叫做 Functor type class
class XstreamFunctor implements Functor<"Xstream"> {
  map<A, B>(f: (v: A) => B, fa: Xstream<A>): Xstream<B> {
    return new Xstream(f(fa.value))
  }
}

// 但是, 用起来好难看, 每次用 map 还要 new 这么个 Functor 出来, 比如
const element = new XstreamFunctor().map(a=>a+1, new Xstream(1))


// 但是目标 map 的实现是这样的，但是现在这样是不行滴...
// function map<F extends FunctorInstance, A, B>(f: (v: A) => B, fa: $<F, A>) $<F, B> {
//   return new Functor<F>().map(f, fa)
// }

function datatype(name: string) {
    return (constructor: Function) => {
        Reflect.defineMetadata('design:type', name, constructor);
    }
}

function kind(target: any) {
    return Reflect.getMetadata('design:type', target.constructor);
}