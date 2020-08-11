// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '表单分组'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
      cy.formItem('商品标题').find('input').type('雨伞').should('have.value', '雨伞')
      cy.formItem('商品代码').find('input').type('001').should('have.value', '001')
      cy.formItem('库存').find('input').type('99').should('have.value', '99')
      cy.formItem('价格').find('input').type('100').should('have.value', '100')
      cy.get('.el-collapse .el-collapse-item').last().click()
      cy.formItem('简介').find('textarea').type('上好佳雨伞').should('have.value', '上好佳雨伞')
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '雨伞' })
      cy.checkColValue({ col: 3, value: '001' })
      cy.checkColValue({ col: 6, value: '99' })
      cy.checkColValue({ col: 5, value: '100' })
      cy.checkColValue({ col: 7, value: '上好佳雨伞' })
    },
    doEdit () {
      cy.get('.el-collapse .el-collapse-item').should('have.length', 3)
    },
    doView () {
      cy.get('.el-collapse .el-collapse-item').should('have.length', 4)
      cy.get('.el-collapse .el-collapse-item').contains('自定义').should('exist')
      cy.wait(500) // TODO ueditor 关闭过快会报一个offsetWidth的错，暂时通过延时测试忽略该问题
    }
  })
})
