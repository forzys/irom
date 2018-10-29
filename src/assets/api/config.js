


const Axios=( params={} ) => {
  let _params = Object.assign({
    methods: 'get',
    url: '',
    data: '',
  }, params)

  return axios({
    methods: _params.methods,
    baseURL: 'http://localhost:8080/',
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