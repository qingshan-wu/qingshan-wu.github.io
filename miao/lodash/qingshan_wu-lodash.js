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

  function fill(ary, value, start=0, end=array.length) {

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









  return {
    chunk,
    compact,
    concat,
    difference,
    join,
    last,
    lastIndexOf,
    reverse,
    drop,
    dropRight,
    flatten
  }
}()