export function createCrudTest (context) {
  const cy = context.cy
  it('打开', () => {
    cy.openMenu(context)
  })

  it('添加', () => {
    cy.closeDialog()
  })
  if (context.doAdd) {
    it('测试添加', () => {
      context.doAdd()
    })
  }

  it('关闭对话框', () => {
    cy.closeDialog()
  })
  if (context.checkAdd) {
    it('检查添加', () => {
      context.checkAdd()
    })
  }

  it('打开编辑', () => {
    cy.openEdit()
  })
  if (context.doEdit) {
    it('测试编辑', () => {
      context.doEdit()
    })
  }

  it('关闭对话框', () => {
    cy.closeDialog()
  })
  if (context.checkEdit) {
    it('检查编辑', () => {
      context.checkEdit()
    })
  }

  it('删除', () => {
    cy.doDelete()
  })

  if (context.checkEdit) {
    it('检查删除', () => {
      context.checkEdit()
    })
  }
}
