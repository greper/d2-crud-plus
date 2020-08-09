// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '动态添加表单字段'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
      cy.formItem('创建时间').find('.el-input').click()
      cy.get('.el-picker-panel').contains('此刻').click()
      cy.formItem('创建时间').find('input').should((target) => {
        return target.value != null
      })
      cy.formItem('分组字段').find('input').type('123').should('have.value', '123')
    },
    checkAdd () {
      cy.checkId(context, '1', false)
      cy.checkColValue({ col: 3, value: '123' })
    },
    doEdit () {
      cy.formItem('分组字段').find('input').clear().type('321').should('have.value', '321')

      cy.get('.el-form .form-body-append').contains('添加未分组字段').click()
      cy.formItem('动态添加1')
      cy.get('.el-form .form-body-append').contains('添加分组字段').click()
      cy.formItem('动态添加2')
      cy.get('.el-form .form-body-append').contains('添加新分组').click()
      cy.formItem('动态添加4')
      cy.get('.el-form .form-body-append').contains('修改字段配置').click()
      cy.formItem('分组字段').find('.el-select')
    },
    checkEdit () {
      cy.checkId(context, '1', false)
      cy.checkColValue({ col: 3, value: '321' })
    },
    doView () {
      cy.formItem('分组字段').find('input').should('be.disabled').should('have.value', '321')
    }
  })
})
