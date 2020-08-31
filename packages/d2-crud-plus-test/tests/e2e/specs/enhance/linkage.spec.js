// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '选择联动'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/linkage',
    doAdd () {
      cy.formItem('省').find('input').click()
      cy.getSelectOptions().first().click()
      cy.formItem('省').find('input').should('have.value', '北京市')

      cy.formItem('市').find('input').click()
      cy.getSelectOptions().first().click()
      cy.formItem('市').find('input').should('have.value', '北京市辖区')

      cy.formItem('区').find('input').click()
      cy.getSelectOptions().first().click()
      cy.formItem('区').find('input').should('have.value', '东城区')
    },
    checkAdd () {
      cy.getCell({ col: 2 }).contains('北京市')
      cy.getCell({ col: 3 }).contains('北京市辖区')
      cy.getCell({ col: 4 }).contains('东城区')
    },
    doEdit () {
      cy.formItem('省').find('input').click()
      cy.getSelectOptions().last().click()
      cy.formItem('省').find('input').should('have.value', '天津市')
    },
    checkEdit () {
      cy.getCell({ col: 2 }).contains('天津市')
      cy.getCell({ col: 3 }).contains('北京市辖区').should('not.exist')
      cy.getCell({ col: 4 }).contains('东城区').should('not.exist')
    },
    doView () {
      cy.formItem('省').find('input').should('have.value', '天津市')

      cy.formItem('市').find('input').should('not.have.value', '北京市辖区')

      cy.formItem('区').find('input').should('not.have.value', '东城区')
    },
    doAfter () {
      Cypress.log({ message: '检查搜索' })
      cy.formItem('省', '.d2p-search-form').find('input').click()
      cy.getSelectOptions().last().click()
      // cy.searchClick()
      cy.checkId(context, '2')

      cy.formItem('市', '.d2p-search-form').find('input').click()
      cy.getSelectOptions().first().click()

      cy.formItem('区', '.d2p-search-form').find('input').click()
      cy.getSelectOptions().first().click()
    }
  })
})
