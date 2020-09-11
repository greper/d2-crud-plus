// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '隐藏操作列'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/rowHandleHide',
    editDisabled: true,
    deleteDisabled: true,
    viewDisabled: true,
    doAdd () {
      cy.formItem('radio').find('label.el-radio').first().click()
    },
    doEdit () {
    },
    doAfter () {
      cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-view]').should('not.exist')
      cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-edit]').should('not.exist')
      cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-delete]').should('not.exist')
    }
  })
})
