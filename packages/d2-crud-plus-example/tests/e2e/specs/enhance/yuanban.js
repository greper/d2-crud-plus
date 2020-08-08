// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('d2Crud原版', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: 'd2Crud原版',
    doAdd () {
    },
    doEdit () {
    }
  })
})
