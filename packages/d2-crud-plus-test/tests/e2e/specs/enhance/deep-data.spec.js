// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('多级数据', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: '多级数据',
    doAdd () {
      cy.formItem('用户名').find('input').type('小红').should('have.value', '小红')
      cy.formItem('性别').find('.el-select').click()
      cy.getSelectOptions().last().click()

      cy.formItem('部门名称').find('input').type('测试部').should('have.value', '测试部')
      cy.formItem('部门状态').find('.el-radio').first().click()
      cy.formItem('爱好').find('.el-checkbox').first().click()
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '小红' })
      cy.checkColValue({ col: 3, value: '女' })
      cy.checkColValue({ col: 4, value: '测试部' })
      cy.getCell({ col: 5 }).contains('打开')
      cy.getCell({ col: 6 }).contains('打开')
    },
    doEdit () {
    }
  })
})
