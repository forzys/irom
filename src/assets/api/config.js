


const Axios=( params={} ) => {
  let _params = Object.assign({

    methods: 'get',
    url: '',
    data: '',
    
  }, params)

  return axios({

    methods: _params.methods,
    url: _params.url,
    data: _params.data,

  }).then(res => {

    let _res=res.data
    return _res

  }).catch(e => {

    return e

  })
}

export default Axios