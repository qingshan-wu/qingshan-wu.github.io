/*
 * @Author: qingshan
 * @Date: 2020-12-08 15:01:43
 */

const { iteratee } = require("lodash");

var qingshan_wu = function() {

/* -- 工具集 ------------------------------------------ */

  function sameValueZero(a, b) {
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    return a !== a && b !== b;
  }
  // 1 / +0 == Infinity, 1/ -0 == -Infinity
  //NaN !== NaN 为true

  // 类型检测工具集
  const types = ["Null", "Undefined", "Boolean",
              "Number", "String", "Object", "Array",
              "Function"]
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
      pathArr = iteratee.split('.')
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

/* --------------------------------------------------- */


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
    intersection,
    intersectionBy,
    intersectionWith,
    identity,
    isMatch,
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
    unzip,
    unzipWith,
    mapKeys,
    mapValues,
    cloneDeep,
    isArray,
    toArray,

    /* -- collection ----- */
    countBy,

    /* -- Math ----------- */

    add,
    divide,
    mean,
    meanBy,
    multiply,

    /* -- Object --------- */

    toPairs,
    keys,
    values,
  };

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

  /* function findIndex(ary, predicate = identity, fromIndex = 0) {
    for (var i = fromIndex; i < ary.length; i++) {

      if (typeUtils.isFunction(predicate)) {
        if (predicate(ary[i])) {
          return i
        }
      }

      if (typeUtils.isObject(predicate)) {
        if (isEqual(ary[i], predicate)) {
          return i
        }
      }

      if (typeUtils.isArray(predicate)) {
        for (var key in ary[i]) {
          let obj = ary[i]
          if (key == predicate[0] && obj[key] == predicate[1]) {
            return i
          }
        }
      }

      if (typeUtils.isString(predicate)) {
        for (var key in ary[i]) {
          let obj = ary[i]
          if (key == predicate && obj[key]) return i
        }
      }

    }
    return -1
  } */

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

  /* function isEqual(a, b) {
    if (a === b) return true
    var ta = Object.getPrototypeOf(a)
    var tb = Object.getPrototypeOf(b)

    if (ta == tb) { //类型对比

      if (ta == Array.prototype || ta == String.prototype) {
        if (a.length != b.length) return false
        for (var i = 0; i < a.length; i++) {
          var tai = Object.getPrototypeOf(a[i])
          var tbi = Object.getPrototypeOf(b[i])
          if (tai != tbi) {
            return false
          } else if (tai == Array.prototype ||
                    tai == Object.prototype) {
            isEqual(a[i], b[i])
          } else if (a[i] != b[i]) return false
        }
      }

      if (ta == Object.prototype) { //对比对象
        for (var key in a) {
          if (a[key] != b[key]) return false
        }
        for (var key in b) {
          if (a[key] != b[key]) return false
        }
      }
      if (ta == Number.prototype) {
        if (a != b) return false
      }

    } else {
      return false
    }
    return true
  } */

  //字面量判断
  // 非复杂值未进入上方if，就会进入下方if语句，return false
  function isEqual(a, b) {
    if (a === b) return true;

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

  //  s = source, t = target
  //  => boolean
  //  ({ 'a': 4, 'c': 6 },{ 'a': 4, 'b': 5, 'c': 6 })
  //  true
  function partialDeepEqual(s, t) {
    if (s === t) return true;

    if (s == null || typeof s != "object" ||
        t == null || typeof t != "object")
      return false;

    for (var prop in s) {
      if (!(prop in t) || !partialDeepEqual(s[prop], t[prop]))
        return false;
    }

    return true;
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

  function isMatch(obj, source) {
    return partialDeepEqual(source, obj)
  }

  // => function
  function matches(obj) {
    return partialDeepEqual.bind(null, obj)
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
      if (values.includes(arr[i])) {
        arr.splice(i, 1)
        i--
      }
    }
    return arr
  }

  function pullAllBy(arr, values, iteratee) {
    iteratee = processType(iteratee)
    let val = values.map(it => iteratee(it))

    for (let i = 0; i < arr.length; i++) {
      if (val.includes(iteratee(arr[i]))){
        arr.splice(i, 1)
        i--
      }
    }
    return arr
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

  function cloneDeep(value) {
    if (typeUtils.isArray(value)) {
      let res = []
      for (let ele of value) {
        if (typeUtils.isObject(ele) ||
            typeUtils.isArray(ele)) {
          res.push(cloneDeep(ele))
        } else {
          res.push(ele)
        }
      }
      return res
    }

    if (typeUtils.isObject(value)) {
      let res = {}
      for (let key in value) {
        let val = value[key]
        if (typeUtils.isObject(val) ||
            typeUtils.isArray(val)) {
          res[key] = cloneDeep(val)
        } else {
          res[key] = val
        }
      }
      return res
    }

    let res = value
    return res
  }

  function isArray(val) {
    return typeUtils.isArray(val)
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

  /* -- Object ----------------------------------------- */
  function toPairs(obj) {
    let res = []
    for (let key in obj) {
      if (obj.hasOwnProperty(key))
        res.push([key, obj[key]])
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

  function values(obj) {
    let res = []
    for (let key in obj){
      if (obj.hasOwnProperty(key))
        res.push(obj[key])
    }
    return res
  }



}()