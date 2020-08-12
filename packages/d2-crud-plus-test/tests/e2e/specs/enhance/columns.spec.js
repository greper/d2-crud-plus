// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '特殊列'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    idColIndex: 5,
    listWait: 6000,
    editForce: true,
    // editWait: 5000,
    viewForce: true,
    // viewWait: 5000,
    deleteForce: true,
    viewDisabled: true,
    doAdd () {
    },
    doEdit () {
    }
  })
})
