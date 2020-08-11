// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('日期组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '日期时间',
    doAdd () {
    },
    doEdit () {
    }
  })
})
