import mockUtil from '@/business/mock/base'

const options = {
  name: 'area',
  idGenerator: 0
}
const list = [
  {
    id: ++options.idGenerator,
    province: '北京市',
    area: '市辖区',
    city: '东城区',
    pca: ['11', '1101', '110101'],
    pca2: ['北京市', '市辖区', '东城区'],
    pca3: [
      ['北京市', '市辖区', '东城区'],
      ['北京市', '市辖区', '西城区']
    ],
    pca4: [['北京市', '市辖区', '东城区'], ['北京市', '市辖区', '西城区']],
    pcaTree: ['11'],
    pcaTree2: ['110101', '110102', '110105', '110106', '110107', '110108', '110109', '110111']
  },
  {
    id: ++options.idGenerator,
    pca: ['11', '1101', '110101'],
    pca2: ['北京市', '市辖区', '东城区'],
    pca3: [
      ['北京市', '市辖区', '东城区'],
      ['北京市', '市辖区', '西城区']
    ],
    pca4: [
      ['北京市', '市辖区', '东城区'],
      ['北京市', '市辖区', '西城区']
    ],
    pcaTree: ['11'],
    pcaTree2: ['110101', '110102']
  },
  {
    id: ++options.idGenerator,
    pca: ['11', '1101', '110101'],
    pca2: ['北京市', '市辖区', '东城区'],
    pca3: [['北京市', '市辖区', '东城区'], ['北京市', '市辖区', '西城区']],
    pca4: [['北京市', '市辖区', '东城区'], ['北京市', '市辖区', '西城区']],
    pcaTree: ['11'],
    pcaTree2: ['110101', '110102']
  }
]
options.list = list

const mock = mockUtil.buildMock(options)
mock.push({
  path: '/area/tree',
  method: 'get',
  handle (req) {
    const tree = [
      { id: 10000, label: '北京市', children: [{ id: 100003, label: '市辖区', children: [{ id: 100004, label: '东城区' }, { id: 100005, label: '西城区' }] }] },
      { id: 10010, label: '天津市', children: [{ id: 100013, label: '市辖区', children: [{ id: 100014, label: '天津湾' }, { id: 100015, label: '渤海湾' }] }] }
    ]
    return {
      code: 0,
      msg: 'success',
      data: tree
    }
  }
})
export default mock
