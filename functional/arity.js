if (Object.defineProperty && typeof WeakMap == 'function') {
    Object.defineProperty(Function.prototype, 'arity', (function() {
        var fnToString = Function.prototype.toString,
            map = new WeakMap,
            reDefaultAndRest = /=|\.\.\./g,
            reHeading = /^[^]+(?<=\)\s*)\{/;

        return {
            'get': function() {
                if (map.has(this)) {
                    return map.get(this);
                }
                var result = this.length,
                    heading = (heading = reHeading.exec(fnToString.call(this))) ? heading[0] : '',
                    extras = heading.match(reDefaultAndRest);

                result += extras ? extras.length : 0;
                map.set(this, result);
                return result;
            }
        };
    }()));
}

const log = (...args) => console.log(...args);

function foo(a, b = 1, ...c) { return [a, b, c] }

log(foo(0, undefined, 2, 3, 4)); // => [0, 1, [2, 3, 4]]
log(foo.length); // => 1
log(foo.arity); // => 3

function baz(a, b = 1, c = { hello: "world" }, ...d) { return [a, b, c, d] }

log(baz(0, undefined, undefined, 2, 3, 4)); // => [0, 1, [2, 3, 4]]
log(baz.length); // => 1
log(baz.arity); // => 3

// Y = λf. (λx. f( x x ))(λx. f( x x ))

const
    _fix = f => x => f(_fix(f))(x),
    _fact = _fix(f => n => !n ? 1 : n * f(n - 1)),
    candidate = fn => n => !n ? 1 : n * fn(n - 1),
    // fix = (f => x => f(fix(f))(x))(candidate),
    Y = (f => x => f(Y(f))(x))(candidate),
    auto_curry = (f, ...i) => (s => s(s)(i))(
        func => p => (...c) => c.length + p.length >= f.length ? f(...p.concat(c)) : func(func)(p.concat(c))
    );
console.log(_fact(10));

// ETA Expansion

const ifix = f => x => f(ifix(f))(x);
//               ^              ^^^


const fact = ifix(
    f => n => (n === 0) ? 1 : n * f(n - 1)); // stack safe

console.log(fact(10)); // 3628800

// function fibFactory(fib) {
//     return function(x) {
//         return !x ? 1 : x * fib(x - 1);
//     };
// }

// function smartFn(x) {
//     var createTheFnCall = function(f) {
//         return function(x) { return fibFactory(f)(x); }
//     }

//     var createFnAndCallFn = createTheFnCall(createTheFnCall);
//     var createFnAndCallFn2 = createTheFnCall(createTheFnCall);

//     return createFnAndCallFn(x);
// }

const fibFactory = f => x => !x ? 1 : x * f(f)(x - 1);

const smartFn = fac => x => (f => x => fac(f)(x))(f => x => fac(f)(x))(x);

console.log(smartFn(f => x => !x ? 1 : x * f(f)(x - 1))(10));
console.log(smartFn(fibFactory)(10));

const func = f => n => !n ? 1 : n * f(f)(n - 1);
const fix = f => func(f);
const fibo = fix(func);
console.log('ours:\r\n', fibo(10));


const xfibo = (f => n => !n ? 1 : n * f(f)(n - 1))(f => n => !n ? 1 : n * f(f)(n - 1));
console.log('again:\r\n', xfibo(10));

// Y = λf. (λx. f( x x ))(λx. f( x x ))
const Ycombinator = (λf => λx => !λx ? 1 : λx * λf(λf)(λx - 1))(λf => λx => !λx ? 1 : λx * λf(λf)(λx - 1));
console.log('Y:\n', Ycombinator(10));

const g = λf => λx => !λx ? 1 : λx * λf(λf)(λx - 1)
const fixedPoint = λf => λf(λf);
const combined = fixedPoint(g);
console.log('fixedPoint:\n', combined(10));

// const
//     auto_curry = (f, ...i) => (s => s(s)(i))(s => p => (...c) => c.length + p.length >= f.length ? f(...p.concat(c)) : s(s)(p.concat(c)));

const build = curried => f => p => (...args) => {
    console.log(`p.length: ${p.length}, args.length: ${args.length}, curried: ${curried.length}`);
    return args.length + p.length >= curried.length ? curried(p.concat(args)) : f(f)(p.concat(args));
};
const curry = curryFn => ((x => x(x))(build(curryFn)))([]);

const _add = (a, b, c, d, e) => a + b + c + d + e;
const add = curry(_add);
console.log('add:', add);
const add6 = add(1, 2, 3);
console.log('add6:', add6);
const add10 = add6(4);
console.log('add10:', add10);
console.log('add6:', add6(3, 4));
console.log('add10:', add10(8));