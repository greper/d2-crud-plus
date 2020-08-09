// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '多级表头'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
    },
    doEdit () {
    },
    doAfter () {
      Cypress.log({ message: '检查多级表头' })
      cy.get('.el-table__header-wrapper table thead tr').should('have.length', 3)
      cy.get('.el-table__header-wrapper table thead tr').contains('多级表头')
      cy.get('.el-table__header-wrapper table thead tr').contains('时间')
      cy.get('.el-table__header-wrapper table thead tr').contains('日期2')
      cy.get('.el-table__header-wrapper table thead tr').contains('状态')
      cy.get('.el-table__header-wrapper table thead tr').contains('地区')
    }

  })
})
