// https://docs.cypress.io/api/introduction/api.html

describe('登录', () => {
  it('登录', () => {
    cy.login('admin', 'admin')
  })
})
