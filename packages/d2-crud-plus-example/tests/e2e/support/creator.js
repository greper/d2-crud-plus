export function createCrudTest (context) {
  const cy = context.cy
  it('打开', () => {
    cy.openMenu(context)
  })

  it('翻页', () => {
    cy.get('.el-pagination ul.el-pager li').contains('2').click()
    cy.checkId(context, '1', false)
    cy.get('.el-pagination ul.el-pager li').contains('1').click()
    cy.checkId(context, '1')
  })

  it('添加', () => {
    cy.openAdd(context)
  })
  if (context.doAdd) {
    it('测试添加', () => {
      context.doAdd(context)
    })
  }

  it('保存', () => {
    cy.closeDialog(context)
  })
  if (context.checkAdd) {
    it('检查添加', () => {
      context.checkAdd(context)
    })
  }
  if (!context.editDisabled) {
    it('打开编辑', () => {
      cy.openEdit(context)
    })
    if (context.doEdit) {
      it('测试编辑', () => {
        context.doEdit(context)
      })
    }

    it('保存', () => {
      cy.closeDialog(context)
    })
    if (context.checkEdit) {
      it('检查编辑', () => {
        context.checkEdit(context)
      })
    }
  }

  if (!context.viewDisabled) {
    it('打开查看', () => {
      cy.openView(context)
    })
    if (context.doView) {
      it('测试查看', () => {
        context.doView(context)
      })
    }
    it('关闭对话框', () => {
      cy.closeDialog(context)
    })
  }

  if (!context.deleteDisabled) {
    it('删除', () => {
      cy.doDelete(context)
    })

    if (context.checkDelete) {
      it('检查删除', () => {
        context.checkDelete(context)
      })
    }
  }

  if (context.doAfter) {
    it('其他', () => {
      context.doAfter(context)
    })
  }

  it('检查异常', () => {
    cy.checkError(context)
  })
}
