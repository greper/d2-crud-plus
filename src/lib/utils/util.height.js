function computeMaxHeight (target, adjust, subclass) {
  if (target != null && subclass != null) {
    target = findSubDom(target, subclass)
  }

  if (target == null) {
    return 'auto'
  }
  if (adjust == null) {
    adjust = 225
  }

  let rectObject = target.getBoundingClientRect()
  let clientHeight = document.documentElement.clientHeight
  let height = clientHeight - rectObject.top - adjust
  return height
}
function findSubDom (target, className) {
  if (target.className != null && target.className.indexOf(className) >= 0) {
    return target
  }
  if (target.childNodes != null && target.childNodes.length > 0) {
    for (const item of target.childNodes) {
      let target = findSubDom(item, className)
      if (target != null) {
        return target
      }
    }
  }
  return null
}
const height = {
  findSubDom,
  computeMaxHeight
}
export default height
