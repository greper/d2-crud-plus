// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

const menu = '固定列'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    listWait: 3000,
    editForce: true,
    // editWait: 5000,
    viewForce: true,
    // viewWait: 5000,
    deleteForce: true,
    doAdd () {
      cy.formItem('撑开').find('input').type('123').should('have.value', '123')
    },
    checkAdd () {
      cy.checkColValue({ col: 6, value: '123' })
    },
    doEdit () {
    },
    doView () {
      cy.formItem('撑开').find('input').should('be.disabled').should('have.value', '123')
    }
  })
})
