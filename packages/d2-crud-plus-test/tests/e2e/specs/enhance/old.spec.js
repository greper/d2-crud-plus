// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '旧版页面'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/old',
    viewDisabled: true,
    doAdd () {
      cy.formItem('radio').find('label.el-radio').first().click()
    },
    checkAdd () {
      cy.getCell({ col: 7 }).should((target) => {
        expect(target.find('.tag-item').text().trim()).to.equal('打开')
      })
    },
    doEdit () {
      cy.formItem('单选远程').find('.el-select').click()
      cy.getSelectOptions().first().click()
      cy.formItem('禁用字典缓存').find('input').click()
      cy.getSelectOptions().first().click()
      cy.formItem('单选本地').find('.el-select').click()
      cy.getSelectOptions().first().click()
      cy.formItem('多选本地').find('.el-select').click()
      cy.getSelectOptions().first().click()
      cy.get('.el-dialog__footer').click()

      cy.formItem('级联单选').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()

      cy.formItem('级联多选').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().find('.el-checkbox').click()
      cy.get('.el-dialog__footer').click()

      cy.formItem('开关组件').find('.el-switch').click()
    },
    checkEdit () {
      cy.getCell({ col: 3 }).should((target) => {
        expect(target.find('.tag-item').text().trim()).to.equal('深圳')
      })
      cy.getCell({ col: 4 }).should((target) => {
        expect(target.find('.tag-item').text().trim()).to.equal('深圳')
      })
      cy.getCell({ col: 5 }).should((target) => {
        expect(target.text().trim()).to.equal('指南 / 设计原则 / 一致')
      })
      cy.getCell({ col: 6 }).should((target) => {
        expect(target.text().trim()).to.equal('指南 / 设计原则 / 一致')
      })
    }
  })
})
