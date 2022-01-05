// https://docs.cypress.io/api/introduction/api.html

import { createCrudTest } from '../../support/creator'

describe('文件上传', () => {
  before(() => {
    cy.login('admin', 'admin')
  })
  createCrudTest({
    cy,
    url: '/demo/form/uploader',
    doAdd () {
      cy.log('测试头像')
      cy.formItem('头像').find('.d2p-file-uploader input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('头像').find('.d2p-file-uploader  .avatar-item-wrapper .avatar img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('src')).as('头像_value')
      })

      cy.log('测试放大按钮')
      cy.formItem('头像').find('.d2p-file-uploader').trigger('mouseover')
      cy.formItem('头像').find('.d2p-file-uploader .preview .el-icon-zoom-in:visible').click()
      cy.get('.el-dialog .el-dialog__body img:visible')
      cy.get('.el-dialog .el-dialog__close:visible').click()

      cy.log('测试获取md5')
      cy.formItem('获取md5').find('.d2p-file-uploader input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('获取md5').find('.d2p-file-uploader  .avatar-item-wrapper .avatar img').then($el => {
        cy.wrap($el.attr('src')).as('获取md5_value')
      })

      cy.formItem('头像文件大小').find('input').should('have.value', '39040')
      cy.formItem('头像文件md5').find('input').should('have.value', 'a7e87805bd7f23104fe2169153249903')

      cy.log('测试照片墙')
      cy.formItem('照片墙').find('.d2p-file-uploader input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 1)

      cy.log('测试照片墙连续上传')
      cy.formItem('照片墙').find('.d2p-file-uploader  input[type=file]')
        .attachFile('files/logo.png', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader  input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 3).as('照片墙')
      cy.get('@照片墙').first().find('img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('src')).as('照片墙_value')
      })

      cy.log('测试照片墙的放大按钮')
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').first()
        .find('.el-upload-list__item-actions').trigger('mouseover').find('.el-icon-zoom-in').click({ force: true })
      cy.get('.el-dialog .el-dialog__body img:visible')
      cy.get('.el-dialog .el-dialog__close:visible').click()

      cy.log('测试图片列表')
      cy.formItem('图片列表').find('.d2p-file-uploader input[type=file]').as('图片列表')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('图片列表').find('.d2p-file-uploader input[type=file]')
        .attachFile('files/logo.png', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('图片列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2).as('图片列表')

      cy.log('测试图片列表的放大')
      cy.formItem('图片列表').find('.d2p-file-uploader .el-upload-list li.is-success')
        .first().find('.el-upload-list__item-name:visible').click()
      cy.get('.el-dialog .el-dialog__body img:visible')
      cy.get('.el-dialog .el-dialog__close:visible').click()

      cy.get('@图片列表').first().find('img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('src')).as('图片列表_value')
      })

      cy.log('测试文件列表')
      cy.dialogScrollTo('bottom')
      cy.formItem('文件列表').find('.d2p-file-uploader  input[type=file]').as('文件列表')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('文件列表').find('.d2p-file-uploader  input[type=file]')
        .attachFile('files/111.txt', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('文件列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2).as('文件列表')

      cy.get('@文件列表').first().find('a').invoke('text').as('文件列表_value')
    },
    checkAdd () {
      cy.getCell({ col: 2 }).find('.el-image img').then($el => {
        cy.get('@头像_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 5 }).find('.el-image img').then($el => {
        cy.get('@获取md5_value').should('contain', $el.attr('src'))
      })
      cy.checkColValue({ col: 6, value: '39040' })
      cy.checkColValue({ col: 7, value: 'a7e87805bd7f23104fe2169153249903' })

      cy.getCell({ col: 8 }).find('.el-image img').first().then($el => {
        cy.get('@照片墙_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 9 }).find('.el-image img').first().then($el => {
        cy.get('@图片列表_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 10 }).find('.tag-item a').first().then($el => {
        cy.get('@文件列表_value').should('contain', $el.text())
      })
    },
    doEdit () {
      cy.dialogScrollTo('top')
      cy.log('测试头像删除')
      cy.formItem('头像').find('.d2p-file-uploader .el-icon-delete').click({ force: true })
      cy.formItem('头像').find('.d2p-file-uploader  .avatar-item-wrapper .avatar img').should('not.exist')
      cy.log('测试获取md5')
      cy.formItem('获取md5').find('.d2p-file-uploader .el-icon-delete').click({ force: true })
      cy.formItem('获取md5').find('.d2p-file-uploader  .avatar-item-wrapper .avatar img').should('not.exist')

      cy.log('测试照片墙删除2个再加1个')
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 3)
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').first()
        .find('.el-upload-list__item-actions .el-icon-delete').click({ force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').first()
        .find('.el-upload-list__item-actions .el-icon-delete').click({ force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 1).as('照片墙')

      cy.formItem('照片墙').find('.d2p-file-uploader  input[type=file]')
        .attachFile('files/头像.jpg', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('照片墙').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2)
      cy.get('@照片墙').first().find('img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('src')).as('照片墙_value')
      })

      cy.log('测试图片列表删除')
      cy.formItem('图片列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2).as('图片列表')

      cy.get('@图片列表').first().find('.el-icon-close').click({ force: true })

      cy.formItem('图片列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 1)

      cy.formItem('图片列表').find('.d2p-file-uploader input[type=file]')
        .attachFile('files/logo.png', 'image/png')
        .trigger('change', { force: true })

      cy.formItem('图片列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2)
      cy.get('@图片列表').first().find('img').then($el => {
        // eslint-disable-next-line no-debugger
        cy.wrap($el.attr('src')).as('图片列表_value')
      })

      cy.log('测试文件列表')
      cy.dialogScrollTo('bottom')
      cy.formItem('文件列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 2).as('文件列表')
      cy.get('@文件列表').first().find('.el-icon-close').click({ force: true })
      cy.formItem('文件列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 1)
      cy.get('@文件列表').first().find('.el-icon-close').click({ force: true })
      cy.formItem('文件列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('not.exist')

      cy.formItem('文件列表').find('.d2p-file-uploader  input[type=file]')
        .attachFile('files/111.txt', 'image/png')
        .trigger('change', { force: true })
      cy.formItem('文件列表').find('.d2p-file-uploader .el-upload-list li.is-success').should('have.length', 1).as('文件列表')

      cy.get('@文件列表').first().find('a').invoke('text').as('文件列表_value')
    },
    checkEdit () {
      cy.getCell({ col: 2 }).find('.el-image img').should('not.exist')
      cy.getCell({ col: 5 }).find('.el-image img').should('not.exist')
      cy.checkColValue({ col: 6, value: '39040' })
      cy.checkColValue({ col: 7, value: 'a7e87805bd7f23104fe2169153249903' })

      cy.getCell({ col: 8 }).find('.el-image').should('have.length', 2).first().find('img').then($el => {
        cy.get('@照片墙_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 9 }).find('.el-image').should('have.length', 2).first().find('img').then($el => {
        cy.get('@图片列表_value').should('contain', $el.attr('src'))
      })
      cy.getCell({ col: 10 }).find('.tag-item a').should('have.length', 1).first().then($el => {
        cy.get('@文件列表_value').should('contain', $el.text())
      })
    },
    doAfter () {
      cy.log('检查图片加载失败')
      cy.getCell({ col: 3 }).find('.el-image img').then($el => {
        expect($el.attr('src')).to.be.equal('http://greper.docmirror.cn/extends/error.jpg')
      })
      cy.getCell({ col: 4 }).find('.el-image .el-icon-picture-outline')
    }
  })
})
