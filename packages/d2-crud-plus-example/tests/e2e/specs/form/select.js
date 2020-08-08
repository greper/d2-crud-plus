// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../common'

describe('选择组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })

  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '选择组件'
  })
})
