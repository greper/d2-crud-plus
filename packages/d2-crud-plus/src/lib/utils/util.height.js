function computeMaxHeight ({ target, targetSubClass, footer, adjust = 35 }) {
  if (target != null && targetSubClass != null) {
    target = findSubDom(target, targetSubClass)
  }
  if (target == null) {
    return 'auto'
  }

  let targetRect = target.getBoundingClientRect()
  let targetTop = targetRect.top // 表头body x坐标

  let footerHeight = 0
  if (footer != null) {
    let footerRect = footer.getBoundingClientRect()
    footerHeight = footerRect.height
  }
  let clientHeight = document.documentElement.clientHeight

  let maxHeight = clientHeight - targetTop - footerHeight - adjust
  return maxHeight // 表格body最大高度= 可视窗口高度 - 表头body x坐标 - 表格底部所有组件高度（翻页组件）- 调整高度
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
