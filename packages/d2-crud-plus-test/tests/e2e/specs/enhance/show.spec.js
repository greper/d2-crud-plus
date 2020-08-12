// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '显隐只读'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
      cy.get('.el-dialog__body .el-form-item > .el-form-item__label').contains('显隐目标').should('not.exist')
      cy.formItem('动态显隐').find('.el-radio').first().click()
      cy.get('.el-dialog__body .el-form-item > .el-form-item__label').contains('显隐目标')

      cy.formItem('文本').find('input').should($el => {
        expect($el).to.have.prop('readonly', false)
      })
      cy.formItem('textarea').find('textarea').should($el => {
        expect($el).to.have.prop('readonly', false)
      })
      cy.formItem('只读').find('.el-switch').first().click()
      cy.formItem('文本').find('input').should($el => {
        expect($el).to.have.prop('readonly', true)
      })
      cy.formItem('textarea').find('textarea').should($el => {
        expect($el).to.have.prop('readonly', true)
      })
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '显示' })
    },
    doEdit () {
    }
  })
})
