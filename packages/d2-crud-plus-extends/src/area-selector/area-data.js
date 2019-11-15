const pcaData = () => import('china-division/dist/pca-code.json')
export default pcaData().then(ret => { return ret.default })
