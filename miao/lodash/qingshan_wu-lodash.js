var qingshan_wu = function() {

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

  function concat(ary) {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] instanceof Array) {
        ary.push(...arguments[i])
      } else {
        ary.push(arguments[i])
      }
    }
    return ary
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
    var res = ary.slice()
    for (var i = 0; i < n; i++) {
      res.pop()
    }
    return res
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

  function findIndex(ary, predicate = it => it == val , fromIndex = 0) {
    for (var i = fromIndex; i < ary.length; i++) {
      if (predicate(ary[i])) return i
    }
    return -1
  }
  function findLastIndex(ary, predicate = it => it == val , fromIndex = ary.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(ary[i])) return i
    }
    return -1
  }

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

  function find(ary, predicate=_.identity, fromIndex=0) {
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

  function max(ary) {
    var maxNum = -Infinity
    for (var i = 0; i < ary.length; i++) {
      maxNum = ary[i] > maxNum ? ary[i] : maxNum
    }
    return ary.length == 0 ? undefinded : maxNum
  }



  function min(ary) {
    var minNum = Infinity
    for (var i = 0; i < ary.length; i++) {
      minNum = ary[i] < minNum ? ary[i] : minNum
    }
    return ary.length == 0 ? undefinded : minNum
  }

  function nth(ary, n = 0) {
    return n >= 0 ? ary[n] : ary[ary.length + n]
  }

  function sortedIndex(ary, value) {
    for (var i = 0; i < ary.length; i++) {
      if (value <= ary[i]) return i
    }
    return ary.length
  }
  function sum(ary) {
    var res = 0
    for (var i = 0; i < ary.length; i++) res += ary[i];
    return res
  }





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
    some,
    max,
    min,
    nth,
    flattenDepth,
    sortedIndex,
    sum
  }
}()