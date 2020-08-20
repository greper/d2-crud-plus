// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '嵌套表格2'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/nestTable',
    idColIndex: 7,
    tableIndex: 2,
    listWait: 1000,
    parentSelector: '.rightTable',
    doAdd () {
    },
    doEdit () {
    },
    checkEdit () {
    }
  })
})
