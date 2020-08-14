// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '固定列'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    listWait: 2000,
    editForce: true,
    // editWait: 5000,
    viewForce: true,
    // viewWait: 5000,
    deleteForce: true,
    doAdd () {
      cy.formItem('撑开').find('input').type('123').should('have.value', '123')
      cy.formItem('左边固定').find('.el-input').should($el => {
        expect($el.attr('placeholder')).equal('左边固定1')
      })
    },
    checkAdd () {
      cy.checkColValue({ col: 6, value: '123' })
    },
    doEdit () {
    },
    doView () {
      cy.formItem('撑开').find('input').should('be.disabled').should('have.value', '123')
    },
    doAfter () {
      cy.searchItem('左边固定').find('.el-input').should($el => {
        expect($el.attr('placeholder')).equal('左边固定1')
      })
    }
  })
})
