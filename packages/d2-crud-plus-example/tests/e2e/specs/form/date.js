// https://docs.cypress.io/api/introduction/api.html

import { testCommonPage } from '../common'

describe('表单组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  const parentMenu = '表单组件示例'
  it('日期时间', () => {
    testCommonPage({
      cy: cy,
      parentMenu,
      subMenu: '日期时间'
    })
  })
})
