// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('选择组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })

  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '选择组件',
    doAdd () {
      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('单选远程').parent().find('.el-select').click()
      cy.get('.el-select-dropdown.el-popper ul li').last().click()

      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('radio').parent().find('.el-radio').first().click()
    },
    doEdit () {
      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('单选远程').parent().find('.el-select').click()
      cy.get('.el-select-dropdown.el-popper ul li').last().click()

      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('radio').parent().find('.el-radio').first().click()
    }
  })
})
