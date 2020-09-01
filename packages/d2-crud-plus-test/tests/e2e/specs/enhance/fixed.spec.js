// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '固定列'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/fix',
    isFixed: true,
    // editForce: true,
    // // editWait: 5000,
    // viewForce: true,
    // // viewWait: 5000,
    // deleteForce: true,
    doAdd () {
      cy.formItem('撑开').find('input').type('123').should('have.value', '123')
      cy.formItem('金额').find('input').type('0').should('have.value', '0')
      cy.formItem('左边固定').find('.el-input').should($el => {
        expect($el.attr('placeholder')).equal('左边固定1')
      })
    },
    checkAdd () {
      cy.checkColValue({ col: 6, value: '123' })
      cy.checkColValue({ col: 5, value: '0' })
    },
    doEdit () {
      cy.formItem('金额').find('input').should('have.value', '0')
    },
    doView () {
      cy.formItem('金额').contains('.el-form-item__content', '0')
      cy.formItem('撑开').contains('.el-form-item__content', '123')
    },
    doAfter () {
      cy.searchItem('左边固定').find('.el-input').should($el => {
        expect($el.attr('placeholder')).equal('左边固定1')
      })
    }
  })
})
