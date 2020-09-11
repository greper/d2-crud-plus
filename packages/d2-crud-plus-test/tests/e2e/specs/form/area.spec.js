// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('省市区', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/area',
    doAdd () {
      cy.formItem('级联式').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()

      cy.formItem('值为名称').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()

      cy.formItem('后台返回三个字段').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()

      cy.formItem('多选1').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().find('.el-checkbox').click()
      cy.getCascadeOptions(3).eq(1).find('.el-checkbox').click()
      cy.get('.el-dialog .el-dialog__footer:visible').click()

      cy.formItem('多选2').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).first().click()
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().find('.el-checkbox').click()
      cy.getCascadeOptions(3).eq(1).find('.el-checkbox').click()
      cy.get('.el-dialog .el-dialog__footer:visible').click()

      cy.formItem('树形选择1').find('.d2p-tree-selector').click()
      cy.get('.el-tree .el-tree-node:visible').first().click()
        .find('.el-tree-node__children').click()
        .find('.el-tree-node__children').click()
        .find('.el-checkbox').as('leaf_list').first().click()
      cy.get('@leaf_list').eq(1).click()
      cy.get('.el-dialog__wrapper:visible').scrollTo('bottom')
      cy.get('.el-dialog .el-dialog__footer button:visible').last().click()
      cy.formItem('树形选择1').find('.d2p-tree-selector').contains('东城区')
      cy.formItem('树形选择1').find('.d2p-tree-selector').contains('西城区')
    },
    checkAdd () {

    },
    doEdit () {
    },
    doSearch () {
      cy.searchItem('后台返回三个字段').find('.d2p-cascade').click()
      cy.getCascadeOptions(1).eq(1).click() // 选天津
      cy.getCascadeOptions(2).first().click()
      cy.getCascadeOptions(3).first().click()
      cy.checkId({}, '2')
    }
  })
})
