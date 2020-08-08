// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('富文本', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '富文本',
    doAdd () {
    },
    doEdit () {
    }
  })
})
