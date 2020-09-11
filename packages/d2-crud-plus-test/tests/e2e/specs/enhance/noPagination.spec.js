// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

const menu = '自定义字段类型'
describe(menu, () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/noPagination',
    paginationDisabled: true,
    doAdd () {
    },
    doEdit () {
    }
  })
})
