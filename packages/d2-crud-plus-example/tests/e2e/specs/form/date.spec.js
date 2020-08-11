// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'
import dayjs from 'dayjs'
describe('日期组件', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    parentMenu: '表单组件示例',
    subMenu: '日期时间',
    doAdd () {
      cy.formItem('时间戳').find('.el-input').click()

      cy.get('.el-picker-panel').contains('此刻').click()
      cy.formItem('时间戳').find('input').should($el => {
        const now = dayjs()
        expect(dayjs($el.value).format('YYYY-MM-DD')).to.be.equal(now.format('YYYY-MM-DD'))
      })

      cy.formItem('日期时间').find('.el-input').click()

      cy.get('.el-picker-panel .el-picker-panel__footer:visible').contains('此刻').click()
      cy.formItem('日期时间').find('input').should($el => {
        const now = dayjs()
        expect(dayjs($el.value).format('YYYY-MM-DD')).to.be.equal(now.format('YYYY-MM-DD'))
      })

      cy.formItem('仅日期').find('.el-input').click()
      cy.get('.el-picker-panel .el-date-table .today:visible').click()
      cy.formItem('仅日期').find('input').should($el => {
        const now = dayjs()
        expect(dayjs($el.value).format('YYYY-MM-DD')).to.be.equal(now.format('YYYY-MM-DD'))
      })

      cy.formItem('禁用日期').find('.el-input').click()
      cy.get('.el-picker-panel .el-date-table .today:visible').should('have.class', 'disabled')
      cy.get('.el-picker-panel .el-date-table .today:visible').next().click()

      cy.formItem('仅时间').find('.el-input').click()
      cy.get('.el-time-panel .el-time-panel__footer:visible').contains('确定').click()
      cy.formItem('仅时间').find('input').should($el => {
        const now = dayjs()
        expect(dayjs($el.value).format('HH')).to.be.equal(now.format('HH'))
      })

      cy.formItem('日期范围').find('.el-date-editor').first().click()
      cy.get('.el-picker-panel .el-picker-panel__sidebar:visible').contains('今天一晚').click()

      cy.formItem('日期时间范围').find('.el-date-editor').first().click()
      cy.get('.el-picker-panel .el-picker-panel__sidebar:visible').contains('今天一晚').click()
    },
    checkAdd () {
      const date = dayjs().format('YYYY-MM-DD')
      const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD')
      const hour1 = dayjs().add(-1, 'hour').format('HH')
      const hour2 = dayjs().format('HH')
      const hour3 = dayjs().add(1, 'hour').format('HH')

      cy.checkColValue({ col: 2, value: date, startWith: true })
      cy.checkColValue({ col: 3, value: date, startWith: true })
      cy.checkColValue({ col: 4, value: date, startWith: true })
      cy.checkColValue({ col: 5, value: tomorrow, startWith: true })
      cy.checkColValue({ col: 6, contains: [hour1, hour2, hour3], startWith: true })
      cy.checkColValue({ col: 7, value: date + '至' + tomorrow })
      cy.checkColValue({ col: 8, value: date, startWith: true })
    },
    doEdit () {
      cy.formItem('清空时间戳').find('.el-button').click()
      cy.formItem('时间戳').find('input').should('not.have.value')
    }
  })
})
