var qingshan_wu = function() {

  function chunk(ary, size = 1) {
    var res = [], b = [], count = 0
    for (var i = 0; i < ary.length; i++) {
      if (count < size) {
        b.push(ary[i])
        count++
      } else {
        i--
        res.push(b)
        b = []
        count = 0
      }
    }
    if (b) res.push(b)
    return res
  }






  return {
    chunk

  }
}()