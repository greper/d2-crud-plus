// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/common'

const menu = '禁用启用'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: 'CRUD增强功能',
    subMenu: menu,
    doAdd () {
      cy.formItem('禁用全部').find('.el-switch__core').click()
      cy.formItem('普通禁用动态').find('.el-switch__core').click()

      cy.formItem('选择').find('input').should('be.disabled')
      cy.formItem('文本').find('input').should('be.disabled')
      cy.formItem('radio').find('input').should('be.disabled')
      cy.formItem('checkbox').find('input').should('be.disabled')
      cy.formItem('行内禁用').find('input').should('be.disabled')
      cy.formItem('地区选择').find('input').should('be.disabled')
      cy.formItem('树形选择').find('input').should('be.disabled')
      cy.get('.el-dialog__body').find('.el-form-item__content .d2p-file-uploader').should('have.class', 'is-disabled')
      // cy.get('.el-dialog__body').find('.el-form-item__content checkbox').should('be.disabled')
      cy.get('.el-dialog__body').find('.el-form-item__content textarea').should('be.disabled')
      cy.get('.el-dialog__body').find('.el-form-item__content button').should('be.disabled')
      cy.formItem('普通禁用').find('input').should('be.disabled')
    },
    checkAdd () {
      cy.getCell({ col: 8 }).find('input').should('be.disabled')
    },
    doEdit () {
      cy.formItem('禁用全部').find('.el-switch__core').click()
    },
    checkEdit () {
      cy.getCell({ col: 8 }).find('input').should('not.disabled')
    }
  })
})
