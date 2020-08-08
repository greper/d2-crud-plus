// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add('login', (name, password) => {
  cy.visit('/#/login')
  cy.contains('button.button-login', '登录')

  cy.get('input[placeholder="用户名"]').clear().type(name)
    .should('have.value', name)
  // 输入密码
  cy.get('input[placeholder="密码"]').clear().type(password)
    .should('have.value', password)
  // 提交表单
  cy.get('button.button-login').click()

  cy.contains('首页')
})

Cypress.Commands.add('simpleCrud', (context) => {
  cy.openMenu(context)
})

Cypress.Commands.add('openCrud', (url) => {
  cy.visit('/#' + url)
})

Cypress.Commands.add('openMenu', (context) => {
  cy.get('.d2-layout-header-aside-menu-side li.el-submenu').contains(context.parentMenu).click()
  cy.get('.d2-layout-header-aside-menu-side li.el-menu-item').contains(context.subMenu).click()
})

Cypress.Commands.add('openEdit', () => {
  cy.get('.d2-container-full__body').contains('编辑').first().click()
})
Cypress.Commands.add('closeDialog', () => {
  cy.get('.el-dialog__footer').contains('确定').click()
})

Cypress.Commands.add('openAdd', () => {
  cy.get('.d2-container-full__body').contains('新增').click()
})
Cypress.Commands.add('doDelete', () => {
  cy.get('.d2-container-full__body').contains('删除').first().click()
  cy.contains('.el-message-box__btns', '确定').click()
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
