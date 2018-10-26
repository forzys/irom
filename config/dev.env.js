'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_IT120: '"/it120"',
  API_WEATHER: '"/weather"',
  API_QQMUSIC: '"/qqmusic"',
})


//开发环境配置