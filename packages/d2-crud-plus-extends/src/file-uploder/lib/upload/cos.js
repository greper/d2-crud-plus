import axios from 'axios'
export default {
  doUpload (option) {
    // TODO 大文件需要分片上传
    return axios({
      url: option.action,
      method: 'put',
      onUploadProgress: function (progressEvent) { // 原生获取上传进度的事件
        console.log(progressEvent)
        let e = progressEvent
        if (e.total > 0) {
          e.percent = e.loaded / e.total * 100
        }
        option.onProgress(e)
      },
      data: option.file,
      withCredentials: false
    }).then(res => {
      console.log(res)
      if (res.status !== 200) {
        throw new Error('文件上传失败')
      }
      console.log(option.file.size)
      let result = { size: option.file.size }

      return result
    }).catch(error => {
      option.onError(error)
      console.log(error)
    })
  }
}
