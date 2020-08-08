// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

const menu = '显隐只读'
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
    }
  })
})
