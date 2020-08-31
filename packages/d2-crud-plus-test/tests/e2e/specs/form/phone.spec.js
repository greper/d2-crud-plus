// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('国际电话', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/phone',
    doAdd () {
      const mobile = '18603046467'
      cy.formItem('手机号1').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)

      // 检查远程获取客户姓名
      cy.formItem('客户').find('input').should('have.value', '小明')

      cy.formItem('手机号2').find('.el-select').click()
      cy.formItem('手机号2').find('input[placeholder="请选择"]').clear().type('hong')
      cy.getSelectOptions().first().click()
      const hkMobile = '64111111'
      cy.formItem('手机号2').find('input[placeholder="手机号"]').clear().type(hkMobile).should('have.value', hkMobile)
    },
    checkAdd () {
      cy.checkColValue({ col: 2, value: '(+86)18603046467' })
      cy.checkColValue({ col: 3, value: '小明' })
      cy.checkColValue({ col: 4, value: '(+852)64111111' })
    },
    doEdit () {
      const mobile = '18603046467'
      cy.formItem('手机号2').find('input[placeholder="手机号"]').clear().type(mobile).should('have.value', mobile)
      // 检查手机号错误校验
      cy.formItem('手机号2').contains('手机号不正确')

      cy.formItem('手机号2').find('.el-select').click()
      cy.formItem('手机号2').find('.el-select input').clear().type('china')
      cy.getSelectOptions().first().click()
    },
    checkAfter () {
      // 检查默认手机号是否能够通过校验
      cy.get('.d2-container-full__body .el-table__body-wrapper button i.el-icon-edit').first().click({ force: true })
      cy.closeDialog()
      cy.wait(500)
      cy.formItem('手机号1').contains('请输入手机号').should('not.exist')
    }
  })
})
