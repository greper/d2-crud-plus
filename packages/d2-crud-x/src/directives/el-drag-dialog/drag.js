export default {
  bind (el, binding, vnode) {
    const value = binding.value
    if (!value) return
    let drag = true
    let stretch = true
    let minWidth = 500
    if (typeof value === 'object') {
      drag = value.drag != null ? value.drag : true
      stretch = value.stretch != null ? value.stretch : true
      minWidth = value.minWidth != null ? value.minWidth : 100
    }
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const getStyle = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    // 拖拽
    if (drag) {
      dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        const dragDomWidth = dragDom.offsetWidth
        const dragDomHeight = dragDom.offsetHeight

        const screenWidth = document.body.clientWidth
        const screenHeight = document.body.clientHeight

        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

        // 获取到的值带px 正则匹配替换
        let styL = getStyle(dragDom, 'left')
        let styT = getStyle(dragDom, 'top')

        if (styL.includes('%')) {
          // eslint-disable-next-line no-useless-escape
          styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
          // eslint-disable-next-line no-useless-escape
          styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
        } else {
          styL = +styL.replace(/\px/g, '')
          styT = +styT.replace(/\px/g, '')
        }

        document.onmousemove = function (e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY

          // 边界处理
          if (-(left) > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }

          if (-(top) > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }

          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

          // emit onDrag event
          vnode.child.$emit('dragDialog')
        }

        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }

    // 横向拉伸
    if (stretch) {
      dragDom.onmousemove = function (e) {
        if (e.clientX > dragDom.offsetLeft + dragDom.clientWidth - 10 || dragDom.offsetLeft + 10 > e.clientX) {
          dragDom.style.cursor = 'w-resize'
        } else if (el.scrollTop + e.clientY > dragDom.offsetTop + dragDom.clientHeight - 10) {
          dragDom.style.cursor = 's-resize'
        } else {
          dragDom.style.cursor = 'auto'
          dragDom.onmousedown = null
        }

        dragDom.onmousedown = (e) => {
          const clientX = e.clientX
          const clientY = e.clientY
          let elW = dragDom.clientWidth
          let EloffsetLeft = dragDom.offsetLeft
          let EloffsetTop = dragDom.offsetTop
          // 判断点击的位置是不是为头部

          if (clientX > EloffsetLeft && clientX < EloffsetLeft + elW && clientY > EloffsetTop && clientY < EloffsetTop + 100) {
            // 如果是头部在此就不做任何动作，以上有绑定dialogHeaderEl.onmousedown = moveDown;
          } else {
            document.onmousemove = function (e) {
              e.preventDefault() // 移动时禁用默认事件
              // 左侧鼠标拖拽位置
              if (clientX > EloffsetLeft && clientX < EloffsetLeft + 10) {
                // 往左拖拽
                if (clientX > e.clientX) {
                  dragDom.style.width = elW + (clientX - e.clientX) * 2 + 'px'
                }

                // 往右拖拽
                if (clientX < e.clientX) {
                  if (dragDom.clientWidth < minWidth) {

                  } else {
                    dragDom.style.width = elW - (e.clientX - clientX) * 2 + 'px'
                  }
                }
              }

              // 右侧鼠标拖拽位置
              if (clientX > EloffsetLeft + elW - 10 && clientX < EloffsetLeft + elW) {
                // 往左拖拽
                if (clientX > e.clientX) {
                  if (dragDom.clientWidth < minWidth) {

                  } else {
                    dragDom.style.width = elW - (clientX - e.clientX) * 2 + 'px'
                  }
                }
                // 往右拖拽
                if (clientX < e.clientX) {
                  dragDom.style.width = elW + (e.clientX - clientX) * 2 + 'px'
                }
              }
            }
            // 拉伸结束
            document.onmouseup = function (e) {
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        }
      }
    }
  }
}
