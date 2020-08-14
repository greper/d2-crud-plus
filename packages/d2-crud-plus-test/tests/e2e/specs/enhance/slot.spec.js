// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '自定义组件'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
      cy.formItem('slot自定义').find('input').type('123').should('have.value', '123')
      cy.formItem('创建时间').find('.el-input').click()
      cy.get('.el-picker-panel__footer:visible').contains('此刻').click()
      cy.formItem('更新时间').find('.el-input').click()
      cy.get('.el-picker-panel__footer:visible').contains('此刻').click()

      cy.formItem('主题').contains('添加主题').click()
      cy.formItem('主题').find('input').type('321')
      cy.formItem('自定义扩展').contains('点击1').click()
      cy.formItem('自定义扩展').contains('您点击了: 1')
      cy.formItem('自定义扩展').contains('插槽：--1--')
      cy.formItem('自定义扩展').contains('点击2').click()
      cy.formItem('自定义扩展').contains('您点击了: 2')
    },
    checkAdd () {
      cy.checkColValue({ col: 3, value: '123' })
      cy.checkColValue({ col: 4, value: '321' })
      cy.checkColValue({ col: 5, value: '您选择了-> 2' })
    },
    doEdit () {
      cy.formItem('slot自定义').find('input').should('have.value', '123')
      cy.formItem('主题').find('input').should('have.value', '321')
    },
    doAfter () {
      cy.get(
        '.d2-container-full__body .el-table__body-wrapper button i.el-icon-edit'
      ).parent().parent().find('button').then($el => {
        expect($el.eq(1).text()).equal('自定义排序')
      })
    }
  })
})
