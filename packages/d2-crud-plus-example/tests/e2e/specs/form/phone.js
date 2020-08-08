// https://docs.cypress.io/api/introduction/api.html

import { testCommonPage } from '../common'

describe('国际电话', () => {
  beforeEach(() => {
    cy.login('admin', 'admin')
  })
  const parentMenu = '表单组件示例'
  it('国际电话', () => {
    testCommonPage({
      cy: cy,
      parentMenu,
      subMenu: '国际电话'
    })
  })
})
