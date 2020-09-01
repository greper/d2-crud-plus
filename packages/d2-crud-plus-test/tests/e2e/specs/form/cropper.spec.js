// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('图片裁剪上传', () => {
  before(() => {
    cy.login1()
  })
  createCrudTest({
    cy,
    url: '/demo/form/cropper',
    doAdd () {
      cy.formItem('头像裁剪').find('.el-icon-plus').click()
      cy.get('.el-dialog__wrapper .el-dialog .el-dialog__body:visible').as('裁剪框')
        .find('.cropper-uploader-wrap input[type=file]')
        .attachFile('files/logo.png', 'image/png')
        .trigger('change', { force: true })
      cy.get('@裁剪框').find('.cropper-uploader-wrap:visible .cropper-canvas').should('be.exist')
      cy.get('.cropper-uploader .el-dialog__footer button:visible').last().click()

      cy.formItem('头像裁剪').find('.d2p-cropper-uploader .image-list .image-item .el-icon-upload-success')
      cy.formItem('头像裁剪').find('.d2p-cropper-uploader .image-list .image-item').as('图片列表')
      cy.get('@图片列表').first().find('.el-image img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('data-src')).as('头像裁剪_value')
      })

      cy.log('添加- 支持多个-上传2个')
      cy.formItem('支持多个').find('.el-icon-plus').click()
      cy.get('.el-dialog__wrapper .el-dialog .el-dialog__body:visible').as('裁剪框')
        .find('.cropper-uploader-wrap input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.get('@裁剪框').find('.cropper-uploader-wrap:visible .cropper-canvas').should('be.exist')
      cy.get('.cropper-uploader .el-dialog__footer button:visible').last().click()

      cy.formItem('支持多个').find('.el-icon-plus').click()
      cy.get('.el-dialog__wrapper .el-dialog .el-dialog__body:visible').as('裁剪框')
        .find('.cropper-uploader-wrap input[type=file]')
        .attachFile('files/logo.png', 'image/png')
        .trigger('change', { force: true })
      cy.get('@裁剪框').find('.cropper-uploader-wrap:visible .cropper-canvas').should('be.exist')
      cy.get('.cropper-uploader .el-dialog__footer button:visible').last().click()

      cy.formItem('支持多个').find('.d2p-cropper-uploader .image-list .image-item .el-icon-upload-success:visible').should('have.length', 2)
      cy.formItem('支持多个').find('.d2p-cropper-uploader .image-list .image-item').as('图片列表')
      cy.get('@图片列表').first().find('.el-image img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('data-src')).as('支持多个_value')
      })
    },
    checkAdd () {
      cy.getCell({ col: 2 }).find('.el-image img').then($el => {
        cy.get('@头像裁剪_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 3 }).find('.el-image').first().find('img').then($el => {
        cy.get('@支持多个_value').should('contain', $el.attr('src'))
      })
    },
    doEdit () {
      cy.log('头像裁剪删除')
      cy.formItem('头像裁剪').find('.d2p-cropper-uploader .image-list .image-item:eq(0) .delete').click()
      cy.formItem('头像裁剪').find('.d2p-cropper-uploader .image-list .image-item').as('图片列表')
      cy.get('@图片列表').find('.el-icon-upload-success').should('not.exist')

      cy.log('支持多个-删除')
      cy.formItem('支持多个').find('.d2p-cropper-uploader .image-list .image-item').first().find('.delete .el-icon-delete').click()
      cy.formItem('支持多个').find('.d2p-cropper-uploader .image-list .image-item').as('图片列表')
      cy.get('@图片列表').find('.el-icon-upload-success').should('have.length', 1)

      cy.get('@图片列表').first().find('.el-image img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('data-src')).as('支持多个_value')
      })
    },
    checkEdit () {
      cy.getCell({ col: 2 }).find('.el-image img').should('not.exist')
      cy.getCell({ col: 3 }).find('.el-image img').first().then($el => {
        cy.get('@支持多个_value').should('contain', $el.attr('src'))
      })
    },
    doAfter () {

    }
  })
})
