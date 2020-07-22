
export default [
  {
    path: '/test/getUploadUrl',
    method: 'get',
    handle (req) {
      return {
        code: 0,
        msg: 'success',
        data: 'https://development-1253338722.cos.ap-guangzhou.myqcloud.com/1105/img/0000/2019/10/15/test-1571135876482-vechr.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDhJk29PQicLtHUnv0riPwITUKzTnx3CII%26q-sign-time%3D1571135876%3B1571137676%26q-key-time%3D1571135876%3B1571137676%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3Db54bf08443fa0d18f5e4828b15c47b4c11b00231'
      }
    }
  }
]
