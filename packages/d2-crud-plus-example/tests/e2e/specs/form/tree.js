// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('树形组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '树形组件',
    doAdd () {
    },
    doEdit () {
    }
  })
})
