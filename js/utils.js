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

// 深拷贝
function deepCopy(target) {
  const basic_type = [
    'number',
    'string',
    'boolean',
    'symbol',
    'null',
    'undefined',
  ]
  let targetType = checkType(target)
  if (
    !target ||
    basic_type.some(function (type) {
      return type === targetType
    })
  ) {
    return target
  }

  let result
  let tmp

  if (targetType.indexOf('weak') !== -1) {
    console.error('warning: weakmap or weakset can not be deep copied!')
    // throw new Error()
  }

  switch (targetType) {
    case 'object': {
      const tmp = {}
      for (const key in target) {
        tmp[key] = deepCopy(target[key])
      }
      result = tmp
      break
    }
    case 'array': {
      result = target.map(function (item) {
        return deepCopy(item)
      })
      break
    }
    case 'map': {
      tmp = []
      target.forEach(function (val, key) {
        tmp.push([key, deepCopy(val)])
      })
      result = new Map(tmp)
      break
    }
    case 'set': {
      tmp = []
      target.forEach(function (val) {
        tmp.push(deepCopy(val))
      })
      result = new Set(tmp)
      break
    }
    case 'function': {
      result = target
      break
    }
    default:
      break
    // return null
  }

  return result
}

module.exports = { checkType, deepCopy }
