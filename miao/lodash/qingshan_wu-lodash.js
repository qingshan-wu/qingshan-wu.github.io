var qingshan_wu = function() {
  return {
    chunk,
    compact,
    concat,
    difference,
    differenceBy,
    differenceWith,
    join,
    last,
    lastIndexOf,
    reverse,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    flatten,
    flattenDeep,
    findIndex,
    findLastIndex,
    reduce,
    reduceRight,
    fromPairs,
    every,
    filter,
    find,
    findLast,
    map,
    groupBy,
    fill,
    head,
    indexOf,
    initial,
    isEqual,
    isEqualWith,
    isElement,
    isEmpty,
    isError,
    isFinite,
    isFunction,
    isInteger,
    isMap,
    intersection,
    intersectionBy,
    intersectionWith,
    identity,
    isMatch,
    isMatchWith,
    isNaN,
    isNil,
    isNative,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isSafeInteger,
    isSet,
    isString,
    isSymbol,
    isTypedArray,
    isUndefined,
    isWeakMap,
    isWeakSet,
    isRegExp,
    matches,
    some,
    max,
    maxBy,
    min,
    minBy,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAllWith,
    flattenDepth,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    takeRightWhile,
    takeWhile,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    sum,
    without,
    xor,
    xorBy,
    xorWith,
    zip,
    zipObject,
    zipWith,
    unzip,
    unzipWith,
    mapKeys,
    mapValues,
    isArray,
    isArguments,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    toArray,
    eq,
    gt,
    gte,
    lt,
    lte,
    isBoolean,
    isDate,
    toFinite,
    range,
    rangeRight,
    times,
    /* -- collection ----- */
    countBy,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    forEachRight,
    includes,
    invokeMap,
    keyBy,
    orderBy,
    partition,
    reject,
    sample,
    sampleSize,
    shuffle,
    size,
    sortBy,
    castArray,
    conformsTo,
    /* -- Math ----------- */
    add,
    divide,
    mean,
    meanBy,
    multiply,
    subtract,
    sumBy,
    clamp,
    inRange,
    random,
    toInteger,
    toLength,
    toNumber,
    assign,
    assignIn,
    toSafeInteger,
    floor,
    round,
    ceil,
    /* -- Object --------- */
    toPairs,
    toPairsIn,
    keys,
    keysIn,
    forOwn,
    forOwnRight,
    values,
    at,
    defaults,
    defaultsDeep,
    cloneDeep,
    findKey,
    findLastKey,
    forIn,
    forInRight,
    functions,
    functionsIn,
    get,
    has,
    hasIn,
    invert,
    invertBy,
    invoke,
    merge,
    mergeWith,
    pick,
    pickBy,
    omit,
    omitBy,
    result,
    set,
    setWith,
    property,
    propertyOf,
    /* -- Function ------- */
    flip,
    ary,
    negate,
    toPath,
    unary,
    spread,
    /* -- String --------- */
    pad,
    padEnd,
    padStart,
    repeat,
    replace,
    snakeCase,
    split,
    startCase,
    startsWith,
    toLower,
    toUpper,
    trim,
    trimEnd,
    trimStart,
    truncate,
    unescape,
    upperCase,
    upperFirst,
    words,
    camelCase,
    transform,
    unset,
    update,
    updateWith,
    valuesIn,
    capitalize,
    endsWith,
    escape,
    escapeRegExp,
    kebabCase,
    lowerCase,
    lowerFirst,
    parseInt,
    defaultTo,
    conforms,
    constant,
    flow,
  };
/* --------------------------------------------------- */
  function sameValueZero(a, b) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    return a !== a && b !== b;
  }
  // 1 / +0 == Infinity, 1/ -0 == -Infinity
  //NaN !== NaN 为true

  const types = ["Null", "Undefined", "Boolean",
              "Number", "String", "Object", "Array",
              "Function", "Date", "Error"]
  const typeUtils = {}

  types.forEach(type => {
    typeUtils["is" + type] = function(obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]";
    }
  })

  // <= iteratee 可以迭代的结构
  // => function
  function processType(iteratee) {
    if (typeUtils.isFunction(iteratee))
      return iteratee;

    if (typeUtils.isObject(iteratee))
      return matches(iteratee);

    if (typeUtils.isArray(iteratee))
      return obj => obj[iteratee[0]] === iteratee[1];

    if (typeUtils.isNull(iteratee) ||
        typeUtils.isUndefined(iteratee))
      return val => val;

    if (typeUtils.isString(iteratee)) {
      let pathArr = iteratee.split('.')
      if (pathArr.length == 1) {
        return obj => obj[iteratee]
      } else {
        return obj => pathArr.reduce((prev, cur) => prev[cur] , obj)
      }
      // function (obj) {
      //   let prev = obj
      //   for (let key of pathArr) {
      //     prev = prev[cur]
      //   }
      //   return prev
      // }
    }
  }

  function processPath(path) {
    if (isString(path)) {
      let reg = /\w+/g
      return path.match(reg)
    }
    return path
  }

/* --------------------------------------------------- */




  function chunk(ary, size = 1) {
    var res = [], temp = []
    for (var i = 0; i < ary.length; i++) {
      if (temp.length < size) {
        temp.push(ary[i])
        continue
      }
      res.push(temp)
      temp = [ary[i]]
    }
    if (temp) res.push(temp)
    return res
  }

  function compact(ary) {
    let res = []
    for (let item of ary) {
      if (item) res.push(item)
    }
    return res
  }

  function concat(...values) {
    let res = []

    for (let val of values) {
      if (Array.isArray(val)) {
        val.forEach(it => res.push(it))
      } else {
        res.push(val)
      }
    }

    return res
  }

  function difference(ary, ...values) {
    var vals = []
    for (var i = 0; i < values.length; i++) {
      for (var ii = 0; ii < values[i].length; ii++) {
        vals.push(values[i][ii])
      }
    }
    var set2 = new Set(vals)
    for (var j = 1; j < arguments.length; j++) {
      if (arguments[j] instanceof Array) {
        set2.add(...arguments[j])
      } else {
        set2.add(arguments[j])
      }
    }

    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (!set2.has(ary[i])) res.push(ary[i])
    }
    return res
  }

  function differenceBy(arr, ...values) {
    let iteratee = values[values.length - 1]
    if (Array.isArray(iteratee)) {
      iteratee = undefined
    } else {
      values.pop()
    }
    iteratee = processType(iteratee)
    let res = []
    let val = flatten(values).map(it => iteratee(it))

    for (let e of arr) {
      if (!val.includes(iteratee(e))) {
        res.push(e)
      }
    }

    return res
  }

  function join(ary, separator=',') {
    var str = ''
    var se = String(separator)
    for (var i = 0; i < ary.length - 1; i++) {
      str += ary[i] + se
    }
    return str + ary[i]
  }

  function last(ary) {
    return ary[ary.length - 1]
  }

  function lastIndexOf(ary, value, fromIndex = ary.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (ary[i] == value) return i
    }
    return -1
  }

  function reverse(ary) {
    var res = []
    for (var i = ary.length - 1; i >= 0; i--) {
      res.push(ary[i])
    }
    return res
  }

  function drop(ary, n = 1) {
    return ary.slice(n)
  }

  function dropRight(ary, n = 1) {
    var idx = ary.length - n
    return idx >= 0 ? ary.slice(0, idx) : []
  }

  // => a slice of arr
  function dropRightWhile(arr, predicate) {
    predicate = processType(predicate)
    for (var i = arr.length - 1; i >= 0; i--) {
      if (!predicate(arr[i], i, arr)) {
        break
      }
    }
    return arr.slice(0, i + 1)
  }

  function dropWhile(arr, predicate) {
    predicate = processType(predicate)
    for (var i = 0; i < arr.length; i++) {
      if (!predicate(arr[i], i, arr)) {
        break
      }
    }
    return arr.slice(i)
  }

  function differenceWith(ary, values, comparator) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (!comparator(ary[i], values[j])) res.push(ary[i])
      }
    }
    return res
  }

  function flatten(ary) {
    let res = []
    for (let item of ary) {
      if (item instanceof Array) {
        res.push(...item)
      } else {
        res.push(item)
      }
    }
    return res
  }

  function flattenDeep(ary) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] instanceof Array) {
        res.push(...flattenDeep(ary[i]))
      } else {
        res.push(ary[i])
      }
    }
    return res
  }

  function flattenDepth(ary, depth = 1) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] instanceof Array && depth > 0) {
        res.push(...flattenDepth(ary[i], depth - 1))
      } else {
        res.push(ary[i])
      }
    }
    return res
  }

  function findIndex(ary, predicate, fromIndex = 0) {
    predicate = processType(predicate);
    for (var i = fromIndex; i < ary.length; i++) {
      if (predicate(ary[i]))
        return i;
    }
    return -1;
  }

  function findLastIndex(ary, predicate, fromIndex = ary.length - 1) {
    predicate = processType(predicate);
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i]))
        return i;
    }
    return -1
  }

  // coll => collection, acc => accumulator
  function reduce(coll, iteratee, acc) {
    iteratee = processType(iteratee)
    if (acc == undefined) {
      if (typeUtils.isArray(coll) && coll.length > 0) {
        acc = coll[0]
      }
      if (typeUtils.isObject(coll)) {
        acc = {}
      }
    } else {
      if (typeUtils.isArray(coll)) {
        acc = iteratee(acc, coll[0], 0, coll)
      }
    }

    if (typeUtils.isArray(coll)) {
      for (let i = 1; i < coll.length; i++) {
        acc = iteratee(acc, coll[i], i, coll)
      }
    }

    if (typeUtils.isObject(coll)) {
      for (let key in coll) {
        acc = iteratee(acc, coll[key], key, coll)
      }
    }
    return acc
  }

  // obj应该没有左右之分?
  function reduceRight(coll, iteratee, acc) {
    iteratee = processType(iteratee)

    if (acc == undefined) {
      acc = coll[coll.length - 1]
    } else {
      let lastIdx = coll.length - 1
      acc = iteratee(acc, coll[lastIdx], lastIdx, coll)
    }

    for (let i = coll.length - 2; i >= 0; i--) {
      acc = iteratee(acc, coll[i], i, coll)
    }

    return acc
  }


  // (a && b && c) === !(!a || !b || !c)
  /* function every(ary, predicate) {
    for (var i = 0; i < ary.length; i++) {
      if (!predicate(ary[i])) return false
    }
    return true
  } */
  function every(ary, predicate) {
    predicate = processType(predicate)
    for (let e of ary) {
      if (!predicate(e)) return false
    }
    return true
  }
  function some(ary, predicate) {
    predicate = processType(predicate)
    for (let e of ary) {
      if (predicate(e))
        return true;
    }
    return false
  }

  function filter(ary, predicate) {
    let res = []
    predicate = processType(predicate)
    for (let e of ary) {
      if (predicate(e))
        res.push(e);
    }
    return res
  }

  function find(ary, predicate, fromIndex=0) {
    predicate = processType(predicate)
    for (let i = fromIndex; i < ary.length; i++) {
      let e = ary[i]
      if (predicate(e))
        return e;
    }
    return undefined
  }

  function findLast(ary, predicate, fromIndex=ary.length-1) {
    predicate = processType(predicate)
    for (let i = fromIndex; i >= 0; i--) {
      let e = ary[i]
      if (predicate(e))
        return e;
    }
    return undefined
  }

  function map(collection, iteratee) {
    iteratee = processType(iteratee)
    let res = []

    if (typeUtils.isArray(collection)) {
      collection.forEach((e, idx, ary) => {
        res.push(iteratee(e, idx, ary))
      })
    }

    if (typeUtils.isObject(collection)) {
      for (let key in collection) {
        let val = collection[key]
        res.push(iteratee(val))
      }
    }

    return res
  }

  // => arr, (iteratee = identity)
  // => obj
  function groupBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let res = {}
    for (let e of arr) {
      let key = iteratee(e)
      if (!res[key]) {
        res[key] = [e]
      } else {
        res[key].push(e)
      }
    }
    return res
  }

  function fill(ary, value, start = 0, end = ary.length) {
    for (var i = start; i < end; i++) {
      ary[i] = value
    }
    return ary
  }

  function fromPairs(pairs) {
    var res = {}
    for (var i = 0; i < pairs.length; i++) {
      res[pairs[i][0]] = pairs[i][1]
    }
    return res
  }

  function head(ary) {
    return ary[0]
  }

  function indexOf(ary, value, fromIndex = 0) {
    for (var i = fromIndex; i < ary.length; i++) {
      if (ary[i] == value) return i
    }
    return -1
  }

  function initial(ary) {
    return ary.slice(0, ary.length - 1)
  }

  function isElement(val) {
    return Object.prototype.toString.call(val) === "[object HTMLElement]"
  }

  function isEmpty(val) {
    if (isArray(val))
      return val.length == 0;

    if (isObject(val)) {
      if (typeUtils.isObject(val)) {
        return Object.keys(val).length == 0
      }
      return val.size == 0;
    }
    return arguments.length <= 1
  }
  //字面量判断
  // 非复杂值未进入上方if，就会进入下方if语句，return false
  function isEqual(a, b) {
    if (a === b) return true;

    if (a !== a && b !== b) return true;

    if (a == null || typeof a != "object" ||
        b == null || typeof b != "object")
      return false;

    var propsInA = 0, propsInB = 0;

    for (var prop in a)
      propsInA += 1;

    for (var prop in b) {
      propsInB += 1;
      if (!(prop in a) || !isEqual(a[prop], b[prop]))
        return false;
    }

    return propsInA == propsInB;
  }

  function isEqualWith(obj, oth, customizer) {
    if (customizer == undefined) {
      return isEqual(obj, oth)
    }
    customizer = processType(customizer)
    if (isArray(obj) && isArray(oth) && obj.length == oth.length) {
      for (let i = 0; i < obj.length; i++) {
        if (!customizer(obj[i], oth[i], i, obj, oth))
          return false;

        return true;
      }
    }
    if (typeUtils.isObject(obj) && typeUtils.isObject(oth)
        && Object.keys(obj).length == Object.keys(oth).length) {
      for (let key in obj) {
        if (!customizer(obj[key], oth[key], key, obj, oth))
          return false;

        return true;
      }
    }

    return customizer(obj, oth)
  }

  function isError(val) {
    return typeUtils.isError(val)
  }

  function isFinite(val) {
    return Number.isFinite(val)
  }

  function isFunction(val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  }

  function isInteger(val) {
    return isFinite(val) && Math.floor(val) === val
  }

  function isMap(val) {
    return Object.prototype.toString.call(val) === "[object Map]"
  }



  // intersection([1,2,3], [1,2,4], [3])
  // []
  function intersection(A, ...arys) {
    let res = []
    A.forEach(item => {
      let count = 0

      arys.forEach(ary =>
        count += ary.includes(item) ? 1 : 0 )

      if (count == arys.length)
        res.push(item)
    })
    return res
  }

  // => []
  function intersectionBy(...args) {
    let firstArr = args.shift()
    iteratee = processType(args.pop())
    let arr = flatten(args).map(it => iteratee(it))

    let res = []
    firstArr.forEach(it => {
      if (arr.includes(iteratee(it))) {
        res.push(it)
      }
    })

    return res
  }

  function intersectionWith(...args) {
    let firstArr = args.shift()
    iteratee = processType(args.pop())
    let arr = flatten(args)

    let res = []
    firstArr.forEach(A => {
      arr.forEach(a => {
        if (iteratee(A, a))
          res.push(A)
      })
    })

    return res
  }

  // => obj and obj[newKey] = oldVal
  function mapKeys(obj, iteratee) {
    iteratee = processType(iteratee)
    let res = {}
    for (let key in obj) {
      let val = obj[key]
      let newKey = iteratee(val, key, obj)
      res[newKey] = val
    }
    return res
  }

  // iteratee的传参类比自 arr.map(it, idx, arr)
  // => obj and obj[oldKey] = newVal
  function mapValues(obj, iteratee) {
    iteratee = processType(iteratee)
    let res = {}
    for (let key in obj) {
      res[key] = iteratee(obj[key], key, obj)
    }
    return res
  }

  function identity(value) {
    return value
  }

    //  ({ 'a': 4, 'c': 6 },{ 'a': 4, 'b': 5, 'c': 6 })
  //  true
  function isMatchReverse(source, obj) {
    return isMatch(obj, source)
  }


  function isMatch(obj, src) { //确定 object 是否含有和 source 完全相等的属性值。
    if (obj === src) return true;

    if (obj == null || typeof obj != "object" ||
        src == null || typeof src != "object")
      return false;

    for (var prop in src) {
      if (!(prop in obj) || !isMatch(obj[prop], src[prop]))
        return false;
    }

    return true;
  }

  function isMatchWith(obj, src, customizer) {
    for (let key in src) {
      if (!(key in obj) || !customizer(obj[key], src[key]))
        return false;
    }
    return true
  }

  function isNaN(val) {
    if (isObject(val)) {
      return val.valueOf() !== val.valueOf()
    }
    return val !== val
  }

  function isNative(val) {
    if (val == undefined) return false;
    return Function.prototype.toString.call(val).includes
                    ("[native code]")
  }

  function isNil(val) {
    return isNull(val) || isUndefined(val)
  }

  function isNull(val) {
    return Object.prototype.toString.call(val) === "[object Null]"
  }

  function isNumber(val) {
    return Object.prototype.toString.call(val) === "[object Number]"
  }

  function isObject(val) {
    return typeof val == "object" || isFunction(val)
  }

  function isObjectLike(val) {
    return !isNull(val) && typeof val === "object"
  }

  function isPlainObject(val) {
    let p = Object.getPrototypeOf(val)
    return p === Object.prototype || p === null;
  }

  function isSafeInteger(val) {
    return Number.isSafeInteger(val)
    // Number.isSafeInteger(Number.MIN_VALUE) == false
    // Number.isSafeInteger(Infinity) == false
  }

  function whatType(val) {
    return Object.prototype.toString.call(val)
  }

  function isSet(val) {
    return whatType(val) === "[object Set]"
  }

  function isString(val) {
    return whatType(val) === "[object String]"
  }

  function isSymbol(val) {
    return whatType(val) === "[object Symbol]"
  }

  function isTypedArray(val) {
    return whatType(val) === "[object Uint8Array]"
  }

  function isUndefined(val) {
    return whatType(val) === "[object Undefined]"
  }

  function isWeakMap(val) {
    return whatType(val) === "[object WeakMap]"
  }

  function isWeakSet(val) {
    return whatType(val) === "[object WeakSet]"
  }

  function isRegExp(val) {
    return whatType(val) === "[object RegExp]"
  }

  // => function
  function matches(source) {
    return isMatchReverse.bind(null, source)
  }

  function max(ary) {
    var maxNum = -Infinity
    for (var i = 0; i < ary.length; i++) {
      maxNum = ary[i] > maxNum ? ary[i] : maxNum;
    }
    return ary.length == 0 ? undefined : maxNum
  }

  function maxBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let maxEle = arr[0]
    for (let e of arr) {
      if (iteratee(maxEle) < iteratee(e)) {
        maxEle = e;
      }
    }
    return maxEle
  }

  function min(ary) {
    var minNum = Infinity
    for (var i = 0; i < ary.length; i++) {
      minNum = ary[i] < minNum ? ary[i] : minNum
    }
    return ary.length == 0 ? undefined : minNum
  }

  function minBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let minEle = arr[0]
    for (let e of arr) {
      if (iteratee(minEle) > iteratee(e)) {
        minEle = e
      }
    }
    return minEle
  }

  function nth(ary, n = 0) {
    return n >= 0 ? ary[n] : ary[ary.length + n]
  }

  function pull(ary, ...values) {
    let res = []
    for (let val of ary) {
      if (!values.includes(val)) {
        res.push(val)
      }
    }
    ary = res.slice()
    return ary
  }

  function pullAll(arr, values) {
    for (let i = 0; i < arr.length; i++) {
      let it = arr[i]
      if (values.includes(it)) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr.slice()
  }

  function pullAllBy(arr, values, iteratee) {
    iteratee = processType(iteratee)
    let val = values.map(it => iteratee(it))

    for (let i = 0; i < arr.length; i++) {
      let it = iteratee(arr[i])
      if (val.includes(it)){
        arr.splice(i, 1)
        i--
      }
    }
    return arr.slice()
  }



  function pullAllWith(arr, values, iteratee) {
    let count = new Array(arr.length).fill(true)
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (iteratee(arr[i], values[j])){
          count[i] = false
        }
      }
    }

    let p = 0
    for (let i = 0; i < arr.length; i++) {
      let j = i + p
      if (!count[j]) {
        arr.splice(i, 1)
        i--
        p++
      }
    }
    return arr
    // return arr.filter((_, i) => count[i])
  }

  function sortedIndex(ary, value) {
    for (var i = 0; i < ary.length; i++) {
      if (value <= ary[i]) return i
    }
    return ary.length
  }

  function sortedIndexBy(ary, val, iteratee) {
    iteratee = processType(iteratee)
    for (let i = 0; i < ary.length; i++) {
      if (iteratee(ary[i]) >= iteratee(val))
        return i
    }
    return ary.length
  }

  function sortedIndexOf(ary, value) {
    let left = 0, right = ary.length - 1;
    while (left < right) {
      let mid = (right + left) >> 1
      if (ary[mid] < value) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    if (ary[right] == value)
      return right;

    return -1
  }

  function sortedLastIndex(ary, value) {
    for (let i = ary.length - 1; i >= 0; i--) {
      if (value == ary[i])
        return i + 1
    }
    return -1
  }

  function sortedLastIndexBy(ary, value, iteratee) {
    iteratee = processType(iteratee)
    for (let i = ary.length - 1; i >= 0; i--) {
      if (iteratee(ary[i]) == iteratee(value))
        return i + 1
    }
    return -1
  }

  function sortedLastIndexOf(ary, value) {
    let left = 0, right = ary.length - 1;
    while (left < right) {
      let mid = (right + left) >> 1

      if (ary[mid] > value) {
        right = mid - 1
      } else {
        left = mid
      }

      if (right - left <= 1)
        break;
    }
    if (ary[left] == value)
      return left;

    return -1
  }

  function sortedUniq(arr) {
    let res = []
    for (let e of arr) {
      if (!res.includes(e))
        res.push(e)
    }
    return res
  }

  function sortedUniqBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let res = []
    let map = new Map()
    arr.forEach((ele, idx) => {
      let key = iteratee(ele)
      if (!map.has(key)) {
        map.set(key, idx)
      }
    })
    map.forEach(idx => res.push(arr[idx]))
    return res
  }

  function tail(arr) {
    return arr.slice(1)
  }

  function take(arr, n = 1) {
    return arr.slice(0, n)
  }

  function takeRight(arr, n = 1) {
    if (n > arr.length) {
      return arr.slice()
    }
    return arr.slice(arr.length - n)
  }

  // => []
  function takeRightWhile(arr, predicate) {
    predicate = processType(predicate)
    let res = []
    for (let i = arr.length - 1; i >= 0; i--) {
      if (!predicate(arr[i], i, arr)) {
        break
      }
      res.unshift(arr[i])
    }
    return res
  }

  // => []
  function takeWhile(arr, predicate) {
    predicate = processType(predicate)
    let res = []
    for (let i = 0; i < arr.length; i++) {
      if (!predicate(arr[i], i, arr)) {
        break
      }
      res.push(arr[i])
    }
    return res
  }

  // => [no-repeat]
  function union(...arrs) {
    let set = new Set()
    arrs.forEach(arr => {
      arr.forEach(it => {
        set.add(it)
      })
    })
    return Array.from(set)
  }

  // => []
  function unionBy(...args) {
    let iteratee = args[args.length - 1]
    if (Array.isArray(iteratee)) {
      return union(args)
    }

    iteratee = processType(iteratee)
    let set = new Set()
    let arrs = args.slice(0, -1)
    let res = []

    arrs.forEach(arr => {
      arr.forEach(it => {
        if (!set.has(iteratee(it))) {
          set.add(iteratee(it))
          res.push(it)
        }
      })
    })
    return res
  }


  /* function unionWith(...args) {
    let iteratee = args.pop()
    let A = []
    args.forEach(arr => A.push(...arr))

    let count = new Array(A.length).fill(0)
    let res = []

    for (let i = 0; i < A.length; i++) {
      if (count[i] == 1) //即已经被标记过，res中已存在
        continue;

      let val = A[i]
      res.push(val)

      for (let j = i + 1; j < A.length; j++) {
        if (count[j] == 0 && iteratee(val, A[j]))
          count[j] = 1
      }
    }
    return res
  } */

  // 调用了uniqWith
  // => []
  function unionWith(...args) {
    let iteratee = args.pop()
    let A = []
    args.forEach(arr => A.push(...arr))

    return uniqWith(A, iteratee)
  }

  function uniq(arr) {
    return Array.from(new Set(arr))
  }
  // <= [], function
  // => []
  function uniqBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let set = new Set()
    let res = []
    arr.forEach(it => {
      if (!set.has(iteratee(it))) {
        set.add(iteratee(it))
        res.push(it)
      }
    })
    return res
  }

  function uniqWith(arr, iteratee) {
    iteratee = processType(iteratee)
    let count = new Array(arr.length).fill(0)
    let res = []

    for (let i = 0; i < arr.length; i++) {
      if (count[i] == 1) //即已经被标记过，res中已存在
        continue;

      let val = arr[i]
      res.push(val)

      for (let j = i + 1; j < arr.length; j++) {
        if (count[j] == 0 && iteratee(val, arr[j]))
          count[j] = 1
      }
    }
    return res
  }

  function sum(ary) {
    var res = 0
    for (var i = 0; i < ary.length; i++){
      res += ary[i];
    }
    return res
  }

  function without(ary, ...values) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      let val = ary[i]
      if (!values.includes(val)) {
        res.push(val)
      }
    }
    return res
  }

  function xor(...arrays) {
    let res = []
    let map = {}
    let pool = flatten(arrays)

    for (let item of pool)
      map[item] = !map[item] ? 1 : map[item] + 1;

    for (let ary of arrays) {
      ary.forEach(item => {
        if (map[item] == 1) res.push(item)
      })
    }

    return res
  }

  // 返回转化后仍独特的
  function xorBy(...args){
    let iteratee = processType(args.pop())

    let arr = []
    args.forEach(it => arr.push(...it))

    let map = new Map()

    for (let e of arr) {
      let val = iteratee(e)
      if (!map.has(val)) {
        map.set(val, 1)
      } else {
        map.set(val, map.get(val) + 1)
      }
    }

    let res = []
    arr.forEach(e => {
      if (map.get(iteratee(e)) < 2)
        res.push(e)
    })
    return res

  }

  function xorWith(...args) {
    let iteratee = processType(args.pop())

    // let arr = []
    // args.forEach(it => arr.push(...it))
    let arr = args.reduce((res, it) => res.concat(it), [])

    let count = new Array(arr.length).fill(0)

    for (let i = 0; i < arr.length; i++) {
      if (count[i] == 1) //即已经被标记过，已有重复的
        continue;

      let val = arr[i];

      for (let j = i + 1; j < arr.length; j++) {
        if (count[j] == 0 && iteratee(val, arr[j])) {
          count[j] = 1
          count[i] = 1
        }
      }
    }

    return arr.filter((_, i) => count[i] == 0)
  }

  function zip(...arrays) {
    let res = []

    let longestArrIdx = 0
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i].length > arrays[longestArrIdx].length)
        longestArrIdx = i
    }

    let LA = arrays[longestArrIdx]
    LA.forEach((_, i) => {
      res[i] = []
      for (let j = 0; j < arrays.length; j++)
        res[i][j] = arrays[j][i]
    })
    return res
  }

  function zipObject(props, vals) {
    let res = {}
    for (let i = 0; i < props.length; i++) {
      res[props[i]] = vals[i]
    }
    return res
  }

  function zipWith(...args) {
    let iteratee = processType(args.pop())
    return args[0].map((_, i) => {
      return iteratee(...(args.map(row => row[i])))
    })
  }

  // 翻转矩阵
  // => []
  function unzip(arrs) {
    return arrs[0].map((_, i) => arrs.map(arr => arr[i]))
  }

  function unzipWith(arr, iteratee) {
    iteratee = processType(iteratee)
    let regrouped = unzip(arr)
    return regrouped.map(group => {
      return group.reduce((res, it) => iteratee(res, it))
    })
  }

  function isArray(val) {
    return Object.prototype.toString.call(val) === "[object Array]"
  }

  function isArguments(val) {
    if (isArray(val)) return false;
    return typeof val == "object" && "length" in val;
  //   typeof (function() { return arguments; }()) == "object"
  // f.length 形参个数
  }

  function isArrayBuffer(val) {
    return Object.prototype.toString.call(val) === "[object ArrayBuffer]"
  }

  function isArrayLike(val) {
    if (typeUtils.isNumber(val) || isFunction(val)) return false;

    return val.length >= 0 && val.length < Number.MAX_SAFE_INTEGER

  }

  function isArrayLikeObject(val) {
    return typeof val == "object" && isArrayLike(val)
  }

  function isObject(val) {
    return (typeof val == "object" || isFunction(val)) && !isNull(val)
  }

  function toArray(val) {
    let res = []
    if (typeUtils.isObject(val)) {
      for (let key in val)
        res.push(val[key])
    }
    if (typeUtils.isString(val)) {
      return val.split('')
    }
    return res
  }

  function eq(value, other) {
    return sameValueZero(value, other)
  }

  function gt(value, other) {
    return value > other
  }

  function gte(value, other) {
    return value >= other
  }

  function lt(value, other) {
    return value < other
  }

  function lte(value, other) {
    return value <= other
  }

  function isBoolean(val) {
    return Object.prototype.toString.call(val) === "[object Boolean]"
  }

  function isDate(val) {
    return typeUtils.isDate(val)
  }

  function toFinite(val) {
    if (val == -Infinity) return Number.MIN_VALUE;

    if (val == Infinity) return Number.MAX_VALUE;

    if (!isNumber(val)) return Number(val);

    return val;
  }

  /* function range(s = 0, e, step) {
    let res = []

    if (s < 0) {
      if (isUndefined(e) && isUndefined(step)) {
        for (let i = 0; i > s; i += -1) {
          res.push(i)
        }
        return res
      }
    }
    if (s > e) {
      if (isUndefined(step)) {
        return []
      }
      for (let i = 0; i > e; i += step) {
        res.push(i)
      }
    }
    if (step == 0) {
      return new Array(e - 1).fill(s)
    }
    if (isUndefined(step)) {
      if (isUndefined(e)) {
        for (let i = 0; i < s; i++) {
          res.push(i)
        }
        return res
      }
      for (let i = s; i < e; i++) {
        res.push(i)
      }
      return res
    }

    for (let i = s; i < e; i+= step) {
      res.push(i)
    }
    return res
  } */

  function loopHelper(s, e, step, res = []) {
    if (step == 0)
      for (var i = 1; i < e; i += 1) res.push(s);
    else
      for (var i = s; Math.abs(i) < Math.abs(e); i += step) res.push(i);

    return res;
  }

  function range(...args) {
    if (args.length == 1)
      return args[0] == 0 ? [] : loopHelper(0, args[0], args[0] > 0 ? 1 : -1);

    if (args.length == 2)
      return args[0] > args[1] ? [] : loopHelper(args[0], args[1], 1);

    return loopHelper(args[0], args[1], args[2]);
  }

  function rangeRight(...args) {
    return range(...args).reverse()
  }

  /* -- collecetion ------------------------------------ */

  // => {}
  function countBy(val, iteratee) {
    iteratee = processType(iteratee)
    let res = {}
    for (let e of val) {
      let key = iteratee(e)
      res[key] = res[key] ? res[key] + 1 : 1
    }
    return res
  }

  function flatMap(col, iteratee) {
    iteratee = processType(iteratee)
    return flatten(col.map(it => iteratee(it)))
  }

  function flatMapDeep(col, iteratee) {
    iteratee = processType(iteratee)
    return flattenDeep(col.map(it => iteratee(it)))
  }

  function flatMapDepth(col, iteratee, depth = 1) {
    iteratee = processType(iteratee)
    return flattenDepth(col.map(it => iteratee(it)), depth)
  }

  // coll == collection
  function forEach(coll, iteratee) {
    iteratee = processType(iteratee)
    if (typeUtils.isArray(coll)) {
      for (let i = 0; i < coll.length; i++) {
        iteratee(coll[i], i, coll)
      }
    } else { //可以迭代string
      for (let key in coll) {
        iteratee(coll[key], key, coll)
      }
    }
    return coll
  }

  function forEachRight(coll, iteratee) {
    if (typeUtils.isArray(coll) || typeUtils.isString(coll)) {
      for (let i = coll.length - 1; i >= 0; i--) {
        iteratee(coll[i], i, coll)
      }
    } else {
      forEach(coll, iteratee)
    }
    return coll
  }

  function includes(coll, val, fromIdx = 0) {
    if (typeUtils.isArray(coll)) {
      for (let i = fromIdx; i < coll.length; i++) {
        if (sameValueZero(coll[i], val))
          return true
      }
    }
    if (typeUtils.isString(coll) && typeUtils.isString(val)) {
      for (let i = fromIdx; i < coll.length; i++) {
        if (sameValueZero(coll.slice(i, i + val.length), val))
          return true
      }
    }
    if (typeUtils.isObject(coll)) {
      for (let key in coll) {
        if (sameValueZero(coll[key], val))
          return true
      }
    }
    return false
  }

  // 面向测试用例编程
  function invokeMap(coll, path, args) {
    if (typeUtils.isString(path)) {
      return coll.map(it =>  it[path](args))
    }
    if (typeUtils.isFunction(path)) {
      return coll.map(it => path.call(it, args))
    }
  }

  // <= [{}, {}]
  // => {newKey: {}, nK: {}}
  function keyBy(coll, iteratee){
    let res = {}
    iteratee = processType(iteratee)
    coll.forEach(it => res[iteratee(it)] = it)
    return res
  }

  function swap(arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }

  // <= ([], [], [])
  // => []
  // 冒泡排序 bubble sort
  function orderBy(coll, iteratees, orders) {
    let fs = iteratees.map(it => processType(it))

    for (let n = 0; n < iteratees.length; n++) {

      let f = fs[n]
      let order = orders[n]

      for (let i = coll.length - 2; i >= 0; i--) {
        for (let j = 0; j <= i; j++) {

          if (n == 0 || fs[n - 1](coll[j]) == fs[n - 1](coll[j + 1])) { //即不改变上次排序分组结果

            if (order == "asc" && f(coll[j]) > f(coll[j + 1]))  //升序
              swap(coll, j, j + 1);

            if (order == "desc" && f(coll[j]) < f(coll[j + 1]))  //降序
              swap(coll, j, j + 1);

          }
        }
      }
    }
    return coll
  }

  function partition(coll, predicate) {
    predicate = processType(predicate)
    let t = []
    let f = []
    coll.forEach(it =>
      predicate(it) ? t.push(it) : f.push(it)
    )
    return [t, f]
  }

  function reject(coll, predicate) {
    predicate = processType(predicate)
    return coll.filter(it => !predicate(it))
  }

  function sample(coll) {
    return coll[coll.length * Math.random() | 0]
  }

  function sampleSize(coll, n = 1) {
    let res = []

    while (n > 0 && res.length < coll.length) {
      let rd = sample(coll)
      if (!res.includes(rd)) {
        res.push(rd)
        n--
      }
    }

    return res
  }

  // Fisher–Yates shuffle 洗牌算法
  function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let rdIdx = Math.random() * (i + 1) | 0
      //经少量测试好像 * i 也行

      let temp = arr[rdIdx]
      arr[rdIdx] = arr[i]
      arr[i] = temp
    }
    return arr
  }

  function size(coll) {
    if (typeUtils.isObject(coll)) {
      let s = 0
      for (let key in coll) s++;

      return s
    }
    return coll.length
  }


  /* function sortBy(coll, iteratees) {
    for (let f of iteratees) {

      f = processType(f)
      for (let i = coll.length - 2; i >= 0; i++) {

        for (let j = 0; j <= i; j++) {
          if (f(coll[j]) > f(coll[j + 1]))
            swap(coll, j, j + 1);
        }

      }
    }
    return coll
  } */


  function castArray(val) {
    let res = []
    for (let i = 0; i < arguments.length; i++) {
      res.push(arguments[i])
    }
    return res
  }

  function conformsTo(obj, src) {
    for (let key in src) {
      if (!src[key](obj[key])) {
        return false
      }
    }
    return true
  }






  /* -- Math ------------------------------------------- */
  function add(a, b) {
    return a + b
  }

  function divide(a, b) {
    return a / b
  }

  /* function mean(arr) {
    return arr.reduce((avr, cur, idx) =>
      (avr * idx + cur) / (idx + 1))
  } */

  function mean(arr) {
    return arr.reduce((sum, it) => sum + it) / arr.length
  }

  function meanBy(arr, iteratee) {
    iteratee = processType(iteratee)
    let sum = 0
    for (let ele of arr) {
      sum += iteratee(ele)
    }
    return sum / arr.length
  }

  function multiply(a, b) {
    return a * b
  }

  function subtract(a, b) {
    return a - b
  }

  function sumBy(arr, iteratee) {
    iteratee = processType(iteratee)
    return  arr.reduce((res, it) => res + iteratee(it), 0)
  }

  function clamp(number, lower, upper) {
    if (number < lower) {
      return lower
    } else if (number > upper) {
      return upper
    } else {
      return number
    }
  }

  function inRange(n, start, end) {
    if (end == undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      let t = end
      end = start
      start = t
    }
    if (start < end && start <= n && n < end) {
      return true
    }
    return false
  }


  function random(lower = 0, upper = 1, floating = false) {

    let ans = (upper - lower) * Math.random() + lower

    let isFloat = Math.floor(upper) !== upper //floating point

    if (isFloat || floating) { // return floating
      return ans
    }

    return Math.floor(ans)
  }

  function toInteger(val) {
    if (val == Infinity) return Number.MAX_VALUE;

    if (val == -Infinity)return 0;

    if (!isNumber(val)) return Number(val) | 0;

    return val | 0;
  }

  function toLength(val) {
    val = toInteger(val)
    if (val < 0) return 0;
    if (val > 4294967295) return 4294967295;
    return val;
  }

  function toNumber(val) {
    if (isNumber(val)) return val;
    return Number(val);
  }

  function assign(obj, ...sources) {
    // hasOwnproperty
    sources.forEach(src => {
      Object.keys(src).forEach(key =>
        obj[key] = src[key])
      })
    return obj
  }

  function assignIn(obj, ...sources) {
    sources.forEach(src => {
      for (let key in src)
        obj[key] = src[key];
    })
    return obj
  }

  function toSafeInteger(val) {
    if (val == Infinity) return Number.MAX_SAFE_INTEGER;

    if (isNumber(val)) return val | 0;
    // -Infinity | 0 == 0
    // Number.MIN_VALUE | 0 == 0

    return Number(val) | 0;
  }

  function floor(num, precision = 0) {
    if (precision == 0) return Math.floor(num)

    return Math.floor(num * (10 ** precision)) / (10 ** precision)
  }

  function round(num, precision = 0) {
    if (precision == 0) return Math.round(num)

    return Math.round(num * (10 ** precision)) / (10 ** precision)
  }

  function ceil(num, precision = 0) {
    let a = 10 ** precision
    return Math.ceil(num * a) / a
  }



  /* -- Object ----------------------------------------- */
  function toPairs(obj) {
    let res = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        res.push([key, obj[key]])
    }
    return res
  }

  function toPairsIn(obj) {
    if (isMap(obj) || isSet(obj)) {
      return obj.entries()
      // MapIterator {1 => 3, 2 => 3, 4 => 5}
      // SetIterator {3 => 3, 4 => 4, 2 => 2, 5 => 5}
    }
    let res = []
    for (let key in obj) {
      res.push([key, obj[key]])
    }
    return res
  }

  function at(obj, paths) {
    let reg = /\w+/g
    let pathsArr = paths.map(it => it.match(reg))
    let res = []
    for (let path of pathsArr) {
      let t = obj
      for (let key of path) {
        t = t[key]
      }
      res.push(t)
    }
    return res
  }

  // "" => new String => key即idx
  function keys(obj) {
    let res = []
    for (let key in obj){
      if (obj.hasOwnProperty(key))
        res.push(key)
    }
    return res
  }

  function keysIn(obj) {
    let res = []
    for (let key in obj) {
      res.push(key)
    }
    return res
  }

  function values(obj) {
    let res = []
    for (let key in obj){
      if (obj.hasOwnProperty(key))
        res.push(obj[key])
    }
    return res
  }

  function forOwn(obj, iteratee) {
    iteratee = processType(iteratee)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let res = iteratee(obj[key], key, obj)
        if (res === false) break;
      }
    }
    return obj
  }

  function forOwnRight(obj, iteratee) {
    iteratee = processType(iteratee)
    let keys = Object.keys(obj)
    keys.reverse()
    let sign
    for (let key of keys) {
      sign = iteratee(obj[key], key, obj)
      if (sign === false) break;
    }
    return obj
  }

  function sortBy(coll, iteratees) {
    let orders = new Array(iteratees.length).fill("asc")
    return orderBy(coll, iteratees, orders)
  }

  function defaults(obj, ...sources) {
    for (let src of sources) {
      for (let key in src) {
        if (!(key in obj)) {
          obj[key] = src[key]
        }
      }
    }
    return obj
  }

  function defaultsDeep(obj, ...sources) {
    function defaultsHelper(obj, src) {
      for (let key in src) {
        if (!(key in obj)) {
          obj[key] = cloneDeep(src[key])
        }
        if (isObject(src[key])) {
          defaultsHelper(obj[key], src[key])
        }
      }
    }
    for (let src of sources) {
      defaultsHelper(obj, src)
    }
    return obj
  }

  function cloneDeep(obj) {
    if (isRegExp(obj) || !isObject(obj)) return obj;

    var res = isArray(obj) ? [] : {},
        keys = Object.keys(obj);

    for (let key of keys)
      res[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key];

    return res
  }

  function findKey(obj, predicate) {
    predicate = processType(predicate)
    for (let key in obj) {
      if (predicate(obj[key])) {
        return key
      }
    }
  }

  function findLastKey(obj, predicate) {
    predicate = processType(predicate)
    var res
    for (let key in obj) {
      if (predicate(obj[key])) {
        res = key
      }
    }
    return res
  }

  function forIn(obj, iteratee) {
    iteratee = processType(iteratee)
    for (let key in obj) {
      let sign = iteratee(obj[key], key, obj)
      if (sign === false) break
    }
    return obj
  }

  function forInRight(obj, iteratee) {
    iteratee = processType(iteratee)
    let keys = []
    for (let key in obj)
      keys.push(key);
    // Object.keys(obj) 不包含prototype设定的属性
    keys.reverse();

    var sign
    for (let key of keys) {
      sign = iteratee(obj[key], key, obj)
      if (sign === false) break;
    }
    return obj;
  }

  function functions(obj) {
    return Object.keys(obj).filter(key => isFunction(obj[key]))
  }

  function functionsIn(obj) {
    let res = []
    for (let key in obj) {
      if (isFunction(obj[key])) {
        res.push(key)
      }
    }
    return res
  }

  function get(obj, path, defaultval) {
    path = processPath(path);
    let temp = obj
    for (let key of path) {
      if (isUndefined(temp[key]))
        return defaultval;

      temp = temp[key]
    }
    return temp
  }

  function has(obj, path) {
    path = processPath(path)

    let temp = obj
    for (let key of path) {
      if (!temp.hasOwnProperty(key) || temp[key] == undefined)
        return false;

      temp = temp[key]
    }
    return true
  }

  function hasIn(obj, path) {
    path = processPath(path)

    let temp = obj
    for (let key of path) {
      if (temp[key] == undefined)
        return false;

      temp = temp[key]
    }
    return true
  }

  function invert(obj) {
    let keys = Object.keys(obj)
    keys.reverse()

    let res = {}
    for (let key of keys) {
      let val = obj[key]
      if (res[val] == undefined) {
        res[val] = key
      }
    }

    return res
  }

  function invertBy(obj, iteratee) {
    iteratee = processType(iteratee)
    let res = {}

    for (let key in obj) {
      let val = iteratee(obj[key])
      if (res[val] == undefined) {
        res[val] = [key]
      } else {
        res[val].push(key)
      }
    }
    return res
  }

  function invoke(obj, path, ...args) {
      path = processPath(path)

    let method = path.pop()
    let temp = obj
    for (let key of path) {
      if (temp[key] == undefined) break;
      temp = temp[key];
    }
    return temp[method](...args)
  }

  function merge(obj, ...sources) {
    sources.forEach(src => {

      for (let key in src) {
        let srcVal = src[key], objVal = obj[key];

        if (isArray(objVal) && isArray(srcVal)) {
          srcVal.forEach((e, idx) => merge(objVal[idx], e))
          continue
        }

        obj[key] = src[key]
      }

    })
    return obj
  }

  function mergeWith(obj, src, customizer) {
    if (customizer == undefined)
      return merge(obj, [src]);

    for (let key in src) {
      let objVal = obj[key], srcVal = src[key];
      obj[key] = customizer(objVal, srcVal, key, obj, src)
    }
    return obj
  }

  function pick(obj, paths) {
    let res = {}
    paths.forEach(pathStr => {
      let pathArr = processPath(pathStr)
      let temp = obj
      for (var key of pathArr)
        temp = temp[key];

      res[key] = temp
    })
    return res
  }

  function pickBy(obj, predicate) {
    predicate = processType(predicate)
    let res = {}
    for (let key in obj) {
      let val = obj[key]
      if (predicate(val)) {
        res[key] = val;
      }
    }
    return res
  }

  function omit(obj, paths) {
    let res = {}
    for (let key in obj) {
      if (!paths.includes(key)) {
        res[key] = obj[key]
      }
    }
    return res
  }

  function omitBy(obj, predicate) {
    predicate = processType(predicate)
    let res = {}
    for (let key in obj) {
      let val = obj[key]
      if (!predicate(val)) {
        res[key] = val;
      }
    }
    return res
  }

  function result(obj, path, defaultVal) {
    let val = get(obj, path, defaultVal)
    if (isFunction(val)) return val()
    return val
  }

  function set(obj, path, value) {
    path = processPath(path)
    let t = obj
    for (var i = 0; i < path.length - 1; i++) {
      let key = path[i]

      if (t[key] == undefined)
        t[key] = isNaN(Number(path[i + 1])) ? {} : [];

      t = t[key]
    }

    t[path[i]] = value
    return obj
  }

  function setWith(obj, path, value, customizer) {
    path = processPath(path)
    let t = obj
    for (var i = 0; i < path.length - 1; i++) {
      let key = path[i]
      if (t[key] == undefined) {
        t[key] = new customizer(t[key], key, t)
      }
      t = t[key]
    }
    t[path[i]] = value
    return obj
  }

  function property(path) {
    pathArr = processPath(path)
    return function(obj){
      let temp = obj
      for (let key of pathArr) {
        if (temp[key] == undefined)
          return undefined;

        temp = temp[key];
      }
      return temp
    }
  }

  function propertyOf(obj) {
    return function(path) {
      pathArr = processPath(path)
      let temp = obj
      for (let key of pathArr) {
        if (temp[key] == undefined)
          return undefined;

        temp = temp[key]
      }
      return temp
    }
  }



  /* -- Function --------------------------------------- */

  function flip(f) {
    return function (...args) {
      return f(...(args.reverse()))
    }
  }

  function ary(f, n = f.length) {
    return function (...args) {
      return f(args.slice(0, n))
    }
  }

  function negate(predicate) {
    return function(...args) {
      return !predicate(...args)
    }
  }

  function toPath(str) {
    return processPath(str)
  }

  function unary(f) {
    return ary(f, 1)
  }

  function spread(f, start = 0) {
    return function(args) {
      return f(...args.slice(start))
    }
  }

  /* -- String ----------------------------------------- */
  function pad(str = "", length = 0, chars = " ") {
    let res = str, flag = "right";
    while(res.length < length) {
      if (flag == "right") {
        res += chars
        flag = "left"
      } else {
        res = chars + res
        flag = "right"
      }
    }
    return res.slice(0, length)
  }

  function padEnd(str = "", length = 0, chars = " ") {
    let res = str
    while(res.length < length) {
      res += chars
    }
    return res.slice(0, length)
  }

  function padStart(str = "", length = 0, chars = " ") {
    let res = chars
    while(res.length < length) {
      res += res
    }
    return res.slice(0, length - str.length) + str
  }

  function repeat(str = "", n = 1) {
    let res = ""
    while (n-- > 0) {
      res += str
    }
    return res
  }

  function replace(str = "", pattern, replacement) {
    return str.replace(pattern, replacement)
  }

  function snakeCase(str) {
    let reg = /[a-z]+|[A-Z]+[a-z]*/g
    return str.match(reg).join("_").toLowerCase()
  }

  function split(str = "", sepr, limit) {
    return str.split(sepr).slice(0, limit)
  }

  function startCase(str) {
    let reg = /[a-z]{1,}|[A-Z]{1,}[a-z]{0,}/g
    let arr = str.match(reg)
    return arr.map(it =>
      it.replace(/\b\w/, s => s.toUpperCase()))
      .join(" ")
  }

  function startsWith(str, target, pos = 0) {
    return str.substring(pos, target.length + pos) == target
  }

  function toLower(str) {
    return str.toLowerCase()
  }

  function toUpper(str) {
    return str.toUpperCase()
  }

  function trim(str, char = "\\s") {
    let reg = new RegExp("[" + char + "]+", "g")
    return str.replace(reg, "")
  }

  function trimEnd(str, char = "\\s") {
    let re = new RegExp("[" + char + "]+$")
    return str.replace(re, "")
  }

  function trimStart(str, char = "\\s") {
    let re = new RegExp("^[" + char + "]+")
    return str.replace(re, "")
  }

  function truncate(str = "", opt) {
    let omi = opt?.omission ? opt.omission : "...",
        len = opt?.length ? opt.length : 30,
        sep = opt?.separator;

    if (isUndefined(sep))
      return str.slice(0, len - omi.length) + omi;

    let match, lastIdx;

    sep = new RegExp(sep, "g"); // 如果sep本就是正则，就会被加上"g"选项

    while (str.length + omi.length > len) {
      while (match = sep.exec(str))
        lastIdx = match.index;

      str = str.slice(0, lastIdx)
    }
    return str + omi
  }

  function unescape(str) {
    return str.replace(/&amp;|&lt;| &gt;|&quot;|&#39/g,
     x => {
      if (x == "&amp;")
        return "&";
      if (x == "&lt;")
        return "<";
      if (x == "&gt;")
        return ">";
      if (x == "&quot;")
        return '"'
      if (x == "&#39")
        return "'"
    })
  }

  function upperCase(str) {
    let re = /[a-z]+|[A-Z]{1,}[a-z]*/g
    return str.match(re)
              .map(x => x.toUpperCase())
              .join(" ")
  }

  function upperFirst(str) {
    return str.replace(/^\w/, x => x.toUpperCase())
  }

  function words(str = "", pattern = /\w+/g) {
    return str.match(pattern)
  }

  function camelCase(str) {
    return str.match(/[a-zA-Z]+/g)
    .map(char => char.toLowerCase())
    .map((x, i) =>
        i == 0 ? x : x.replace(/^\w/, c => c.toUpperCase()))
    .join("")
  }

  // accumulator = ac
  function transform(obj, iteratee, ac) {
    iteratee = processType(iteratee)
    if (ac == undefined)
      ac = new obj.constructor;

    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      if (iteratee(ac, obj[keys[i]], keys[i], obj) === false)
        break;
    }
    return ac
  }

  function unset(obj, path) {
    path = processPath(path)
    let temp = obj
    for (var i = 0; i < path.length - 1; i++) {
      if (temp[path[i]] == undefined)
        return false;
      temp = temp[path[i]]
    }
    if (temp[path[i]] == undefined)
      return false;
    else {
      delete temp[path[i]]
      return true
    }
  }

  function update(obj, path, updater) {
    path = processPath(path)
    set(obj, path, updater(get(obj, path)))
    return obj
  }

  function updateWith(obj, path, updater, customizer) {
    if (customizer == undefined) {
      return update(obj, path, updater)
    }
    path = processPath(path)
    let temp = obj, key
    for (var i = 0; i < path.length - 1; i++) {
      key = path[i]
      if (temp[key] === undefined) {
        temp[key] = new customizer
      }
      temp = temp[key]
    }
    temp[path[i]] = updater(temp[path[i]])
    return obj
  }

  function valuesIn(obj) {
    let res = []
    for (let key in obj)
      res.push(obj[key]);

    return res
  }

  function capitalize(str = "") {
    return str.replace(/(^\w)(\w+)/, (_, a, b)=>
        a.toUpperCase() + b.toLowerCase())
  }

  function endsWith(str = "", target, pos = str.length) {
    let re = new RegExp(target + (pos === str.length ? "$":""))
    return re.test(str.slice(pos - 1))
    // if (pos === str.length)
    //   re = new RegExp(target + "$" );
    // else
    //   re = new RegExp(target);
  }

  function escape(str) {
    return str.replace(/\&|\<|\>|\"|\'/g,
      x => {
      if (x == "&")
        return "&amp;";
      if (x == "<")
        return "&lt;";
      if (x == ">")
        return "&gt;";
      if (x == '"')
        return "&quot;";
      if (x == "'")
        return "&#39";
    })
  }

  function escapeRegExp(str) {
    return str.replace(/[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g,
      x => `\\${x}`)
  }

  function kebabCase(str) {
    return str.match(/[a-z]+|[A-Z]+[a-z]*/g)
              .map(x => x.toLowerCase())
              .join('-')
  }

  function lowerCase(str) {
    return str.match(/[a-z]+|[A-Z]+[a-z]*/g)
              .map(x => x.toLowerCase())
              .join(' ')
  }

  function lowerFirst(str) {
    return str.replace(/^\w/, x => x.toLowerCase())
  }

  function parseInt(str, radix = 10) {
    return Number.parseInt(str, radix = 10)
  }

  function defaultTo(val, defaultVal) {
    if (isNaN(val) || isNull(val) || isUndefined(val))
      return defaultVal;
    return val
  }

  function times(n, iteratee) {
    let res = []
    for (let i = 0; i < n; i++) {
      if (isFunction(iteratee)) {
        res.push(iteratee(i))
      } else {
        res.push(iteratee)
      }
    }
    return res
  }

  // // 面向测试用例编程...
  // function conforms(source) {
  //   return function (obj) {
  //     for (let key in source) {
  //       if (!source[key](obj[key]))
  //         return false;
  //     }
  //     return true
  //   }
  // }
  function conforms(source) {
    let keys = Object.keys(source)
    return function (obj) {
      for (let key of keys) {
        if (!source[key](obj[key]))
          return false;
      }
      return true
    }
  }

  function constant(value) {
    return function(arg) {
      return value
    }
  }

  function flow(funcs) {
    if (!isArray(funcs)) {
      return funcs
    }
    return function(...args) {
      let ans = funcs[0](...args)
      for (let i = 1; i < funcs.length; i++) {
        ans = funcs[i](ans)
      }
      return ans
    }
  }




}()