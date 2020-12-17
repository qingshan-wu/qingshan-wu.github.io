/*
 * @Author: qingshan
 * @Date: 2020-12-08 15:01:43
 */

var qingshan_wu = function() {

/* ---------------------------------------------------------- */

  /**
   * 工具集
   * @param {*}
   * @return {*}
   * qhmnb
   */
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
    typeUtils["is" + type] = obj => {
      Object.prototype.toString.call(obj) === "[object " + type + "]"
    }
  })

  const identity = it => it






/* ---------------------------------------------------------- */


  return {
    chunk,
    compact,
    concat,
    difference,
    differenceWith,
    join,
    last,
    lastIndexOf,
    reverse,
    drop,
    dropRight,
    flatten,
    flattenDeep,
    findIndex,
    findLastIndex,
    fromPairs,
    every,
    filter,
    find,
    fill,
    head,
    indexOf,
    initial,
    isEqual,
    intersection,
    some,
    max,
    min,
    nth,
    pull,
    flattenDepth,
    sortedIndex,
    sum,
    without,
    xor,
    zip,
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
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) res.push(ary[i])
    }
    return res
  }

  function concat(...values) {
    let result = []

    for (let i = 0; i < values.length; i++) {
      var value = values[i]
      if (Array.isArray(value)) {
        value.forEach(it => result.push(it))
      } else {
        result.push(value)
      }
    }

    return result
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
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i] instanceof Array) {
        res.push(...ary[i])
      } else {
        res.push(ary[i])
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

  function findIndex(ary, predicate = identity, fromIndex = 0) {
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
  }



  function findLastIndex(ary, predicate = identity, fromIndex = ary.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
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
  }


  // (a && b && c) === !(!a || !b || !c)
  function every(ary, predicate) {
    for (var i = 0; i < ary.length; i++) {
      if (!predicate(ary[i])) return false
    }
    return true
  }
  function some(ary, predicate) {
    for (var i = 0; i < ary.length; i++) {
      if (predicate(ary[i])) return true
    }
    return false
  }

  function filter(ary, predicate) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (predicate(ary[i])) res.push(ary[i])
    }
    return res
  }

  function find(ary, predicate = identity, fromIndex=0) {
    for (var i = fromIndex; i < ary.length; i++) {
      if (predicate(ary[i])) return ary[i]
    }
    return undefined
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

      if (ta == Array.prototype || ta == String.prototype) {  //对比数组
        if (a.length != b.length) return false
        for (var i = 0; i < a.length; i++) {
          var tai = Object.getPrototypeOf(a[i])
          var tbi = Object.getPrototypeOf(b[i])
          if (tai != tbi) {
            return false
          } else if (tai == Array.prototype || tai == Object.prototype) {
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

  /* function intersection(A, ...arys) {
    let res = []
    for (let ary of arys) {
      for (let item of ary) {
        if (A.includes(item))
          res.push(item)
      }
    }
    return res
  } */
  function intersection(A, ...arys) {
    let res = []
    A.forEach(item => {
      let count = 0

      arys.forEach(ary => {
        if (ary.includes(item))
          count++
      })

      if (count == arys.length)
        res.push(item)
    })
    return res
  }

  function max(ary) {
    var maxNum = -Infinity
    for (var i = 0; i < ary.length; i++) {
      maxNum = ary[i] > maxNum ? ary[i] : maxNum;
    }
    return ary.length == 0 ? undefined : maxNum
  }



  function min(ary) {
    var minNum = Infinity
    for (var i = 0; i < ary.length; i++) {
      minNum = ary[i] < minNum ? ary[i] : minNum
    }
    return ary.length == 0 ? undefined : minNum
  }

  function nth(ary, n = 0) {
    return n >= 0 ? ary[n] : ary[ary.length + n]
  }

  function pull(ary, ...values) {
    let res = []
    for (let i = 0; i < ary.length; i++) {
      let val = ary[i]
      if (!values.includes(val)) {
        res.push(val)
      }
    }
    ary = res.slice()
    return ary
  }

  function sortedIndex(ary, value) {
    for (var i = 0; i < ary.length; i++) {
      if (value <= ary[i]) return i
    }
    return ary.length
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
    let map = new Map()
    let pool = flatten(arrays)

    for (let i = 0; i < pool.length; i++) {
      let item = pool[i]
      map[item] = !map[item] ? 1 : map[item] + 1
    }

    for (let i = 0; i < arrays.length; i++) {
      let ary = arrays[i]
      ary.forEach(it => {
        if (map[it] == 1) res.push(it)
      })
    }

    return res
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






}()