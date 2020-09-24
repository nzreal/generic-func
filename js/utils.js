// 最大公约数
function maxCommonMultiple(a, b) {
  let max = Math.max(a, b),
    min = Math.min(a, b),
    tmp
  while (min != 0) {
    tmp = max % min
    max = min
    min = tmp
  }
  return max
}

// 最小公倍数
function leastCommonMultiple(a, b) {
  return (a * b) / maxCommonMultiple(a, b)
}

function checkType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase()
}
