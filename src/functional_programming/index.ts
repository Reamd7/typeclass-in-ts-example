import { Identity } from './id.functor';
import { MayBeFunctor } from './maybe.functor';
import { ResultFunctor } from './result.functor';
import { mapCurry, map, mapCurry2 } from './trait/mappable.trait';
import { liftA2 } from './trait/apply.trait';

const el = map((val) => val + 1, Identity.of(1));
const el2 = mapCurry((val: number) => Identity.of(val + 1))(Identity.of(1));
const el3 = mapCurry2(Identity.of(1))

const maybe1 = map(val => val + 1, MayBeFunctor.of(1));
const maybe2 = map(val => val + 1, MayBeFunctor.of<number>(null));

const err1 = map(val => val + 1, ResultFunctor.of(1));
const err2 = map(val => val + 1, ResultFunctor.of<number>(Error("123123123")));

// console.log(
//     // el, 
//     // el2, 
//     // el3, 
//     // el3(x => Identity.of(1 + x)),
//     maybe1,
//     maybe2,
//     err1,
//     err2
// );

console.log(
    liftA2(
        Identity.of((value: number) => (name: string) => `${name} age is ${value}`),
        Identity.of(1),
        Identity.of("Alex"),
    )
);

debugger;
