// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('图标选择', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '图标选择',
    doAdd () {
    },
    doEdit () {
    }
  })
})
