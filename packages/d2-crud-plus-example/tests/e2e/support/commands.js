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
/**
 * 简单页面测试
 */
Cypress.Commands.add('simpleCrud', (context) => {
  cy.openMenu(context)
})
/**
 * 打开某个crud页面
 */
Cypress.Commands.add('openCrud', (url) => {
  cy.visit('/#' + url)
})
/**
 * 点击某个菜单
 */
Cypress.Commands.add('openMenu', (context) => {
  cy.get('.d2-layout-header-aside-menu-side li.el-submenu').contains(context.parentMenu).click()
  cy.get('.d2-layout-header-aside-menu-side li.el-menu-item').contains(context.subMenu).click({ force: true })
  cy.checkId(context, '1')
})

Cypress.Commands.add('openAdd', (context) => {
  cy.get('.d2-container-full__body').contains('新增').click()
})
Cypress.Commands.add('openEdit', (context) => {
  cy.checkId(context, '1', false)
  if (context.editWait) {
    cy.wait(context.editWait)
  }
  const editForce = context.editForce != null ? context.editForce : false
  cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-edit]').first().click({ force: editForce })
})
Cypress.Commands.add('openView', (context) => {
  cy.checkId(context, '1', false)
  if (context.viewWait) {
    cy.wait(context.viewWait)
  }
  const viewForce = context.viewForce != null ? context.viewForce : false
  cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-view]').first().click({ force: viewForce })
})
Cypress.Commands.add('closeDialog', (context) => {
  cy.get('.el-dialog__footer').contains('确定').click()
})

Cypress.Commands.add('doDelete', (context) => {
  cy.checkId(context, '1', false)
  if (context.deleteWait) {
    cy.wait(context.deleteWait)
  }
  const deleteForce = context.deleteForce != null ? context.deleteForce : false
  cy.get('.d2-container-full__body .el-table__body-wrapper button[icon=el-icon-delete]').first().click({ force: deleteForce })
  cy.get('.el-message-box__btns').contains('确定').click()
  cy.get('.d2-container-full__body').contains('新增')
  cy.checkId(context, '1')
})

Cypress.Commands.add('formItem', (label, parentSelect = '.el-dialog__body') => {
  return cy.get(parentSelect + ' .el-form-item > .el-form-item__label').contains(label).first().parent()
})

Cypress.Commands.add('checkId', (context, value, equal = true) => {
  // let idColTitle = context.idColTitle
  // if (idColTitle == null) {
  //   idColTitle = 'ID'
  // }
  // cy.checkColValue({ title: idColTitle, value, equal })

  let idColIndex = context.idColIndex
  if (idColIndex == null) {
    idColIndex = 1
  }
  if (context.listWait) {
    cy.wait(context.listWait)
  }
  cy.checkColValue({ col: idColIndex, row: context.row, value, equal })
})
/**
 * 检查列的值是否正确
 */
Cypress.Commands.add('checkColValue', ({ title, col = 1, row = 1, value, equal = true, wait }) => {
  // cy.get('table thead tr').contains(title).parent().then(($el) => {
  //   const clazz = $el[0].className.substring(0, $el[0].className.indexOf(' '))
  //   const colIndex = clazz.replace('el-table_1_column_', '')
  //   cy.wrap(colIndex).as('colIndex')
  // }).then(() => {
  //   cy.get('tbody > :nth-child(' + row + ') > .el-table_' + row + '_column_' + this.colIndex + ' > .cell').should((target) => {
  //     if (equal) {
  //       expect(target.text()).to.equal(value)
  //     } else {
  //       expect(target.text()).to.not.equal(value)
  //     }
  //   })
  // })

  cy.get('.el-table > .el-table__body-wrapper >  .el-table__body > tbody > :nth-child(' + row + ') > .el-table_' + row + '_column_' + col + ' > .cell').should((target) => {
    if (equal) {
      expect(target.text().trim()).to.equal(value)
    } else {
      expect(target.text().trim()).to.not.equal(value)
    }
  })
})

Cypress.Commands.add('getCell', ({ title, col = 1, row = 1 }) => {
  return cy.get('.el-table > .el-table__body-wrapper >  .el-table__body> tbody > :nth-child(' + row + ') > .el-table_' + row + '_column_' + col + ' > .cell')
})

Cypress.Commands.add('hideFixedBody', (context, hide = true) => {
  return cy.get('.el-table .el-table__fixed-body-wrapper').then(target => {
    target[0].css('display', hide ? 'none' : 'block')
  })
})

Cypress.Commands.add('checkError', (context) => {
  return cy.get('.d2-header-right .el-badge').should('not.exist')
})

Cypress.Commands.add('getSelectOptions', () => {
  return cy.get('.el-select-dropdown.el-popper ul li:visible')
})
Cypress.Commands.add('getCascadeOptions', (blockIndex = 1) => {
  return cy.get('.el-popper.el-cascader__dropdown .el-cascader-menu ul.el-cascader-menu__list:visible:eq(' + (blockIndex - 1) + ')').children()
})

Cypress.Commands.add('searchClick', () => {
  return cy.get('.d2p-search-form').contains('查询').click()
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
