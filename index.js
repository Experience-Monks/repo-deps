var mapLimit = require('map-limit')
var uniq = require('uniq')
var repoDeps = require('gh-repo-dependencies')
var assign = require('object-assign')

var noop = function () {}

var ASYNC_LIMIT = 5

module.exports = listAllDependencies
function listAllDependencies (repos, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = opt || {}
  }
  opt = opt || {}
  cb = cb || noop

  if (!Array.isArray(repos)) {
    throw new TypeError('expects an array as first parameter')
  }

  mapLimit(repos, ASYNC_LIMIT, function (item, next) {
    var parts = item.split('#')
    item = parts[0]
    var ref = parts[1]
    opt = assign({}, opt, { ref: ref })
    repoDeps(item, opt, next)
  }, function (err, allDeps) {
    if (err) return cb(err)
    allDeps = allDeps.reduce(function (a, b) {
      return a.concat(b)
    }, [])
    allDeps.sort(depCompare)
    uniq(allDeps, depCompare)
    cb(err, allDeps)
  })
}

function depCompare (a, b) {
  if (a.name === b.name) {
    return a.version.localeCompare(b.version)
  }
  return a.name.localeCompare(b.name)
}
