// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '查看'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/view',
    doAdd () {
    },
    doEdit () {
    },
    doView () {
      cy.get('.d2-crud-dialog').find('input').should('be.disabled')
    }
  })
})
