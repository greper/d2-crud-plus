// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '表单校验'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/validation',
    doAdd () {
      cy.get('.el-dialog__footer').contains('确定').click()
      cy.formItem('密码').contains('请输入密码')
      cy.formItem('必选').contains('请选择一个选项')

      cy.formItem('密码').find('input').clear().type('123456')
      cy.formItem('确认密码').find('input').clear().type('1234567')
      cy.get('.el-dialog__footer').click()
      cy.formItem('确认密码').contains('两次输入密码不一致')
      cy.formItem('确认密码').find('input').clear().type('123456')
      cy.formItem('确认密码').contains('两次输入密码不一致').should('not.exist')

      cy.formItem('必选').find('.el-input').click()
      cy.getSelectOptions().first().click()

      cy.formItem('邮箱').find('input').clear().type('123456')
      cy.formItem('邮箱').contains('请填写正确的邮箱')
      cy.formItem('邮箱').find('input').clear().type('123@126.com')
      cy.formItem('邮箱').contains('请填写正确的邮箱').should('not.exist')

      cy.formItem('URL').find('input').clear().type('123456')
      cy.formItem('URL').contains('请填写正确的url')
      cy.formItem('URL').find('input').clear().type('http://123.com')
      cy.formItem('URL').contains('请填写正确的url').should('not.exist')
    },
    doEdit () {
    }
  })
})
