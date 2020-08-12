
export function createCrudTest (context) {
  const cy = context.cy
  it('CRUD', () => {
    cy.openMenu(context)
    // 翻页
    cy.log('翻页')
    cy.get('.el-pagination ul.el-pager li').contains('2').click()
    cy.checkId(context, '1', false)
    cy.get('.el-pagination ul.el-pager li').contains('1').click()
    cy.checkId(context, '1')

    // 添加
    cy.log('添加')
    cy.openAdd(context)

    // 测试添加
    if (context.doAdd) {
      context.doAdd(context)
    }
    cy.closeDialog(context)
    if (context.checkAdd) {
      context.checkAdd(context)
    }

    if (!context.editDisabled) {
      cy.log('编辑')
      cy.openEdit(context)
      if (context.doEdit) {
        context.doEdit(context)
      }

      cy.closeDialog(context)
      if (context.checkEdit) {
        context.checkEdit(context)
      }
    }

    if (!context.viewDisabled) {
      cy.log('查看')
      cy.openView(context)
      if (context.doView) {
        context.doView(context)
      }
      cy.closeDialog(context)
    }

    if (!context.deleteDisabled) {
      cy.log('删除')
      cy.doDelete(context)

      if (context.checkDelete) {
        context.checkDelete(context)
      }
    }

    if (context.doSearch) {
      cy.log('查询')
      context.doSearch(context)
    }

    if (context.doAfter) {
      cy.log('其他特性')
      context.doAfter(context)
    }

    cy.log('异常检查')
    cy.checkError(context)
  })
}
