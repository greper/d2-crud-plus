// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('富文本', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '富文本',
    idColIndex: 2,
    editDisabled: true,
    viewDisabled: true,
    addDisabled: true,
    doAdd () {
      cy.wait(2000)
    },
    doEdit () {
      cy.wait(2000)
    },
    doView () {
      cy.wait(2000)
    }
  })
})
