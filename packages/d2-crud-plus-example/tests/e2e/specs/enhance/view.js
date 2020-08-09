// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '查看'
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
