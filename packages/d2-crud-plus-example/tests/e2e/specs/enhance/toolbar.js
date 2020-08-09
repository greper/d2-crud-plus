// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '工具条'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    listWait: 600,
    editForce: true,
    viewForce: true,
    deleteForce: true,
    doAdd () {
      cy.formItem('radio').find('label.el-radio').first().click()
    },
    doEdit () {
    },
    doAfter () {
      Cypress.log({ message: '检查工具条' })
      cy.get('.d2p-toolbar button i.el-icon-refresh').click()
      // cy.contains('loading')

      cy.get('.d2p-search-form').contains('查询')
      cy.get('.d2p-toolbar button i.el-icon-search').click()
      cy.get('.d2p-search-form').contains('查询').should('not.exist')

      cy.get('.d2-crud-body').should($el => {
        expect($el.width()).to.equal(1698)
      })
      cy.get('.d2p-toolbar button i.el-icon-rank').click()
      cy.get('.d2-crud-body').should($el => {
        expect($el.width()).to.be.lessThan(1698)
      })

      cy.get('.d2p-toolbar button i.el-icon-set-up').click()
      cy.get('.d2p-table-columns-filter .component--list-item').contains('默认隐藏').click()
      cy.get('.d2p-table-columns-filter').contains('确定').click()

      cy.get('.has-gutter > tr > .el-table_1_column_10 > .cell').then($el => {
        expect($el.text().trim()).to.equal('默认隐藏')
      })
    }
  })
})
