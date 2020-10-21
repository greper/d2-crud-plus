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
const version = require('../../../../d2-crud-plus-example/package.json').version

Cypress.Commands.add('login', () => {
  cy.log('pm enabled：' + Cypress.env('VUE_APP_PM_ENABLED'))
  if (Cypress.env('VUE_APP_PM_ENABLED') === 'true') {
    cy.log('http接口登录')
    cy.request('POST', 'http://preview.d2-crud-plus.docmirror.cn/api/login', {
      password: 'admin',
      username: 'admin'
    }).then(ret => {
      cy.setCookie('d2admin-' + version + '-token', ret.body.data.token)
    })
  } else {
    cy.log('demo登录')
    cy.setCookie('d2admin-' + version + '-token', '8ab2b2cc-c3e7-4df8-a919-a32b65f10091')
  }
})
Cypress.Commands.add('login1', () => {
  cy.login2('admin', 'admin')
  cy.visit('/#/index')
  cy.contains('首页')
  cy.contains('d2-crud-plus')
})
Cypress.Commands.add('login2', (name, password) => {
  cy.visit('/#/login')
  cy.contains('button.button-login', '登录')

  cy.get('input[placeholder="用户名"]')
    .clear()
    .type(name)
    .should('have.value', name)
  // 输入密码
  cy.get('input[placeholder="密码"]')
    .clear()
    .type(password)
    .should('have.value', password)
  // 提交表单
  cy.get('button.button-login').click()

  cy.contains('首页')
})
/**
 * 简单页面测试
 */
Cypress.Commands.add('simpleCrud', context => {
  cy.openMenu(context)
})
/**
 * 打开某个crud页面
 */
Cypress.Commands.add('openCrud', url => {
  cy.visit('/#' + url)
  cy.get('.el-tabs__nav .el-tabs__item').should('have.length', 2)
})
/**
 * 点击某个菜单
 */
Cypress.Commands.add('openMenu', context => {
  cy.get('.d2-layout-header-aside-menu-side li.el-submenu')
    .contains(context.parentMenu).first()
    .click()
  cy.get('.d2-layout-header-aside-menu-side li.el-menu-item')
    .contains(context.subMenu).first()
    .click({ force: true })
  return cy.checkId(context, '1')
})

Cypress.Commands.add('openAdd', context => {
  return cy.get(context.parentSelector + ' .d2-crud')
    .contains('新增')
    .click()
})
Cypress.Commands.add('openEdit', context => {
  cy.checkId(context, '1', false)
  return cy.get(context.parentSelector + ' .d2-crud .el-table button i.el-icon-edit:visible').first()
    .click()
})
Cypress.Commands.add('openView', context => {
  cy.checkId(context, '1', false)
  return cy.get(context.parentSelector + ' .d2-crud .el-table button i.el-icon-view:visible').first()
    .click()
})
Cypress.Commands.add('closeDialog', context => {
  return cy.get('.el-dialog__footer')
    .contains('确定')
    .click()
})

Cypress.Commands.add('doDelete', context => {
  cy.checkId(context, '1', false)
  cy.get(context.parentSelector + ' .d2-crud .el-table button i.el-icon-delete:visible').first().click()
  cy.get('.el-message-box__btns')
    .contains('确定')
    .click()
  cy.get(context.parentSelector + ' .d2-crud').contains('新增')
  return cy.checkId(context, '1')
})

Cypress.Commands.add('formItem', (label, parentSelect = '.el-dialog__body') => {
  return cy
    .contains(parentSelect + ' .el-form-item > .el-form-item__label:visible', label)
    .first()
    .parent()
})

Cypress.Commands.add('searchItem', (label, parentSelect = '.d2p-search-form') => {
  return cy.formItem(label, parentSelect)
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
  return cy.checkColValue({ col: idColIndex, tableIndex: context.tableIndex, row: context.row, value, equal, parentSelector: context.parentSelector })
})
/**
 * 检查列的值是否正确
 */
Cypress.Commands.add(
  'checkColValue',
  ({
    title,
    col = 1,
    row = 1,
    tableIndex = 1,
    value,
    contains,
    equal = true,
    startWith = false,
    parentSelector = ''
  }) => {
    return cy.get(
      parentSelector +
      ' .el-table > .el-table__body-wrapper >  .el-table__body > tbody > :nth-child(' +
      row +
        ') > .el-table_' +
      tableIndex +
        '_column_' +
        col +
        ' > .cell'
    ).should(target => {
      const text = target.text().trim()
      if (startWith) {
        if (contains) {
          for (const item of contains) {
            if (text.indexOf(item) === 0) {
              // eslint-disable-next-line no-unused-expressions
              expect(true).to.be.true
              return
            }
          }
          // eslint-disable-next-line no-unused-expressions
          expect(text.indexOf(false) === 0).to.be.true
        } else if (value) {
          // eslint-disable-next-line no-unused-expressions
          expect(text.indexOf(value) === 0).to.be.true
        }
      } else if (equal) {
        expect(text).to.equal(value)
      } else {
        expect(target.text().trim()).to.not.equal(value)
      }
    })
  }
)

Cypress.Commands.add('getCell', ({ title, col = 1, row = 1, parentSelector = '' }) => {
  return cy.get(
    parentSelector +
    ' .el-table > .el-table__body-wrapper >  .el-table__body> tbody > :nth-child(' +
      row +
      ') > .el-table_' +
      row +
      '_column_' +
      col +
      ' > .cell'
  )
})

Cypress.Commands.add('hideFixedBody', (context, hide = true) => {
  return cy.get(context.parentSelector + ' .el-table .el-table__fixed-body-wrapper').then(target => {
    target[0].css('display', hide ? 'none' : 'block')
  })
})

Cypress.Commands.add('checkError', context => {
  return cy.get('.d2-header-right').then($el => {
    $el = $el.find('.el-badge')
    if ($el == null || $el.length === 0) {
      cy.log('正确，没有异常')
    } else {
      // 点开日志页面
      cy.visit('/#/log')
      cy.get('.d2-container-full__footer .fa-cloud-upload')
      cy.get('.el-table__empty-block .el-table__empty-text').should('not.exist')
      // eslint-disable-next-line no-unused-expressions
      expect($el).not.exist
    }
  })
})

Cypress.Commands.add('getSelectOptions', () => {
  cy.wait(100) // 上一个还没消失，当前的还没打开的情况下会出问题
  return cy.get('.el-select-dropdown.el-popper ul li:visible')
})
Cypress.Commands.add('getCascadeOptions', (blockIndex = 1) => {
  if (blockIndex === 1) {
    cy.wait(100) // 上一个还没消失，当前的还没打开的情况下会出问题
  }
  cy.get('.el-popper.el-cascader__dropdown .el-cascader-panel .el-cascader-menu:visible')
    .eq(blockIndex - 1)
    .find('.el-cascader-menu__wrap ul li:visible')
})

Cypress.Commands.add('searchClick', (context) => {
  return cy
    .get(context.parentSelector + ' .d2p-search-form')
    .contains('查询')
    .click()
})

Cypress.Commands.add(
  'attachFile',
  {
    prevSubject: 'element'
  },
  (input, fileName, fileType) => {
    return cy.fixture(fileName)
      .then(content => Cypress.Blob.base64StringToBlob(content, fileType))
      .then(blob => {
        const testFile = new File([blob], fileName, { type: fileType })
        const dataTransfer = new DataTransfer()

        dataTransfer.items.add(testFile)
        input[0].files = dataTransfer.files
        return input
      })
  }
)

Cypress.Commands.add(
  'dialogScrollTo',
  (target = 'bottom') => {
    return cy.get('.d2-crud .el-dialog__wrapper:visible').scrollTo(target)
  }
)
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
