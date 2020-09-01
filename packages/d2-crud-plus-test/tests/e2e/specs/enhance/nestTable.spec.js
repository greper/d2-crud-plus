// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '嵌套表格'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/nestTable',
    idColIndex: 1,
    parentSelector: '.leftTable',
    doAdd () {
      cy.formItem('用户').as('subTable').find('.el-table__body-wrapper tbody tr:eq(1)').as('firstRow').click()
      cy.get('@firstRow').should('have.class', 'current-row') // 单行选中测试
      cy.contains('.el-dialog__wrapper .el-pagination ul.el-pager li', '2').click()
      cy.checkColValue({ tableIndex: 3, col: 12, value: '21', parentSelector: '.el-dialog__body' })
      cy.contains('.el-dialog__wrapper .el-pagination ul.el-pager li', '1').click()
      cy.checkColValue({ tableIndex: 3, col: 12, value: '1', parentSelector: '.el-dialog__body' })

      cy.get('@subTable').contains('button', '新增').click()

      cy.get('.el-dialog__wrapper .el-form-item > .el-form-item__label:visible').first().parent().find('input').type('小白')
      cy.contains('.el-dialog__wrapper .el-dialog__footer:visible', '确定').find('button').first().click()
      cy.checkColValue({ tableIndex: 3, col: 14, value: '小白', parentSelector: '.el-dialog__body' })
    },
    checkAdd () {
      cy.checkColValue({ tableIndex: 1, col: 5, value: '2' })
    },
    doEdit () {
      cy.formItem('用户').as('subTable').find('.current_selected').contains('小黄')
    },
    checkEdit () {
    }
  })
})
