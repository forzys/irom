
const host ='http://mori.leanapp.cn:3000'
const Axios=( params={} ) => {
  let _params = Object.assign({
    methods: 'get',
    url: '',
    data: '',
  }, params)

  return axios({
    methods: _params.methods,
    baseURL: host,
    url: _params.url,
    data: _params.data,
  }).then(res => {
    let _res=res.data
    return _res ? _res : res
  }).catch(e => {

    return e

  })
}

export default Axios