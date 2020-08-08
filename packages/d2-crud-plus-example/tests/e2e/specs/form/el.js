// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('EL', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: 'EL表单组件',
    doAdd () {
    },
    doEdit () {
    }
  })
})
