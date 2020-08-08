// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

describe('国际电话', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '国际电话',
    doAdd () {
      const mobile = '18603046467'
      cy.formItem('手机号').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)
      cy.formItem('手机号2').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)
    },
    doEdit () {
      const mobile = '18603046467'
      cy.formItem('手机号').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)
      cy.formItem('手机号2').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)
    }
  })
})
