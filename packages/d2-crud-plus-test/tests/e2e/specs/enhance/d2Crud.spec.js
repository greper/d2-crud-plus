// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('d2Crud原版', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: 'd2Crud原版',
    viewDisabled: true,
    doAdd () {
      cy.formItem('单选远程').find('.el-input').click()
      cy.getSelectOptions().first().click()
    },
    checkAdd () {
      cy.checkColValue({ col: 4, value: '打开' })
    },
    doEdit () {
    }
  })
})
