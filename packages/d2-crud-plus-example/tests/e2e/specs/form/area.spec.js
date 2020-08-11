// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('省市区', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '省市区选择组件',
    doAdd () {
    },
    doEdit () {
    }
  })
})
