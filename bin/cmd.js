#!/usr/bin/env node
var ghauth = require('ghauth')
var ghManyRepoDeps = require('../')
var simpleStats = require('../lib/simple-stats')
var prettyPrint = require('./pretty')
var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['auth'],
  default: { auth: true }
})

if (argv.auth) {
  ghauth({
    configName: 'repo-deps',
    scopes: ['user', 'repo']
  }, function (err, data) {
    if (err) throw err
    run(data.token)
  })
} else {
  run()
}

function createFilter (list) {
  return function (package) {
    return package.list === list
  }
}

function run (token) {
  ghManyRepoDeps(argv._, {
    token: token,
    filter: argv.filter ? createFilter(argv.filter) : undefined
  }, function (err, data) {
    if (err) throw err
    
    if (!argv.raw || argv.pretty) {
      data = data.map(simpleStats)
    }
      
    if (argv.pretty) {
      prettyPrint(data)
    } else {
      console.log(JSON.stringify(data, null, 2))
    }
  })
}