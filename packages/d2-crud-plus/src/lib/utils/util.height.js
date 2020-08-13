function computeMaxHeight ({ target, targetSubClass, footer, adjust = 38 }) {
  if (target != null && targetSubClass != null) {
    target = findSubDom(target, targetSubClass)
  }
  if (target == null) {
    return 'auto'
  }

  const targetRect = target.getBoundingClientRect()
  const targetTop = targetRect.top // 表头body x坐标

  let footerHeight = 0
  if (footer != null) {
    const footerRect = footer.getBoundingClientRect()
    footerHeight = footerRect.height
  }
  const clientHeight = document.documentElement.clientHeight

  const maxHeight = clientHeight - targetTop - footerHeight - adjust
  return maxHeight // 表格body最大高度= 可视窗口高度 - 表头body x坐标 - 表格底部所有组件高度（翻页组件）- 调整高度
}
function findSubDom (target, className) {
  if (target.className != null && target.className.indexOf(className) >= 0) {
    return target
  }
  if (target.childNodes != null && target.childNodes.length > 0) {
    for (const item of target.childNodes) {
      const target = findSubDom(item, className)
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
