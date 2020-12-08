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

  function concat(ary, value) {
    for (var i = 1; i < arguments.length; i++) {
      if (arguments[i] instanceof Array) {
        ary.push(...arguments[i])
      } else {
        ary.push(arguments[i])
      }
    }
    return ary
  }

  function difference(ary, ary2) {
    var set2 = new Set(ary2)
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

  function








  return {
    chunk,
    compact,
    concat,
    difference,
    join,
    last,
    lastIndexOf
  }
}()