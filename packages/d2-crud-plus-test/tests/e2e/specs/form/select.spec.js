// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('选择组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })

  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '选择组件',
    doAdd () {
      cy.formItem('单选远程').find('.el-select').click()
      cy.getSelectOptions().first().click()

      cy.formItem('字典请求覆盖').find('.el-select').click()
      cy.getSelectOptions().first().click()

      cy.formItem('字典自定义').find('.el-select').click()
      cy.getSelectOptions().first().click()

      cy.formItem('禁用字典缓存').find('.el-select').click()
      cy.getSelectOptions().first().click()

      cy.formItem('禁用字典选项').find('.el-select').click()
      // 选项1被禁用
      cy.getSelectOptions().first().should('have.class', 'is-disabled')
      cy.getSelectOptions().last().click()

      // 测试默认值
      // cy.formItem('单选本地').find('.el-select').click()
      // cy.getSelectOptions().last().click()

      cy.formItem('多选本地').find('.el-select').click()
      // 要能够多选
      cy.getSelectOptions().first().click() // 选择第一条
      cy.getSelectOptions().eq(2).click() // 选择第三条

      cy.formItem('级联').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()

      cy.formItem('级联单选').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).find('.el-radio').first().click()
      cy.get('.el-dialog__footer').click()

      cy.formItem('级联多选').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().find('.el-checkbox').click()
      cy.getCascadeOptions(3).eq(2).find('.el-checkbox').click()
      cy.get('.el-dialog__footer').click()

      cy.formItem('radio').find('.el-radio').first().click()

      cy.formItem('checkbox').find('.el-checkbox').first().click()
      cy.formItem('选中联动').contains('打开')

      cy.formItem('选中联动').find('.el-radio').first().click()

      cy.formItem('开关组件').find('.el-switch').click()
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '打开' })
      cy.checkColValue({ col: 3, value: '打开' })
      cy.checkColValue({ col: 4, value: '打开' })
      cy.checkColValue({ col: 5, value: '深圳' })
      cy.checkColValue({ col: 6, value: '深圳  武汉' })
      cy.checkColValue({ col: 7, value: '指南 / 设计原则 / 一致' })
      cy.checkColValue({ col: 8, value: '设计原则' })
      cy.checkColValue({ col: 9, value: '指南 / 设计原则 / 一致指南 / 设计原则 / 效率' })
      cy.checkColValue({ col: 10, value: '打开' })
      cy.checkColValue({ col: 11, value: '打开' })
      cy.checkColValue({ col: 12, value: '打开' })
      cy.checkColValue({ col: 13, value: '开启' })
    },
    doEdit () {
      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('单选远程').parent().find('.el-select').click()
      cy.get('.el-select-dropdown.el-popper ul li').last().click()

      cy.get('.el-dialog__body  .el-form-item > .el-form-item__label').contains('radio').parent().find('.el-radio').first().click()
    },
    doAfter () {
      cy.get('.d2-crud-header .el-button-group button').contains('根据dict获取字典data').click()
      cy.get('.el-message-box .el-message-box__message').contains('[{"value":"')
      cy.get('.el-message-box .el-message-box__btns button').first().click()

      cy.get('.d2-crud-header .el-button-group button').contains('根据列key获取字典data').click()
      cy.get('.el-message-box .el-message-box__message').contains('[{"value":"')
      cy.get('.el-message-box .el-message-box__btns button').first().click()

      cy.get('.d2-crud-header .el-button-group button').contains('获取字典map').click()
      cy.get('.el-message-box .el-message-box__message').contains('{"0":{"value":"0",')
      cy.get('.el-message-box .el-message-box__btns button').first().click()
    }
  })
})
