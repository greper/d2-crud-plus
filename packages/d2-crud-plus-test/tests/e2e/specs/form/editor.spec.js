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
    doAdd () {
      cy.wait(1000)
    },
    doEdit () {
      cy.wait(1000)
    },
    doView() {
      cy.wait(1000)
    }
  })
})
