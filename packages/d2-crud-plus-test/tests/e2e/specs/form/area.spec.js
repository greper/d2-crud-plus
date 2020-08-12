// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('省市区', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '省市区选择组件',
    doAdd () {
    },
    doEdit () {
    },
    doSearch () {
      cy.searchItem('后台返回三个字段').find('.el-cascader input').click()
    }
  })
})
