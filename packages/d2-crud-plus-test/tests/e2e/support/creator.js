
export function createCrudTest (context) {
  const cy = context.cy
  it('打开', () => {
    if (context.url) {
      cy.openCrud(context.url)
    } else {
      cy.openMenu(context)
    }
  })
  it('翻页', () => {
    // 翻页
    cy.log('翻页')
    cy.contains('.el-pagination ul.el-pager li', '2').click()
    cy.checkId(context, '1', false)
    cy.contains('.el-pagination ul.el-pager li', '1').click()
    cy.checkId(context, '1')
  })
  it('添加', () => {
    // 添加
    cy.log('添加')
    cy.openAdd(context)

    // 测试添加
    if (context.doAdd) {
      context.doAdd(context)
    }
    cy.closeDialog(context)
    cy.checkId(context, '1', false)
    if (context.checkAdd) {
      context.checkAdd(context)
    }
  })

  if (!context.editDisabled) {
    it('编辑', () => {
      cy.log('编辑')
      cy.openEdit(context)
      if (context.doEdit) {
        context.doEdit(context)
      }
      cy.closeDialog(context)
      cy.wait(1000)
      if (context.checkEdit) {
        context.checkEdit(context)
      }
    })
  }

  if (!context.viewDisabled) {
    it('查看', () => {
      cy.log('查看')
      cy.openView(context)
      if (context.doView) {
        context.doView(context)
      }
      cy.closeDialog(context)
    })
  }

  if (!context.deleteDisabled) {
    it('删除', () => {
      cy.log('删除')
      cy.doDelete(context)

      if (context.checkDelete) {
        context.checkDelete(context)
      }
    })
  }

  if (context.doSearch) {
    it('查询', () => {
      cy.log('查询')
      context.doSearch(context)
    })
  }

  if (context.doAfter) {
    it('其他特性', () => {
      cy.log('其他特性')
      context.doAfter(context)
    })
  }

  it('异常检查', () => {
    cy.log('异常检查')
    cy.checkError(context)
  })
}
