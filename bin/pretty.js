var color = require('term-color')
var wordWrap = require('word-wrap')
var ghUrl = require('github-url-to-object')

var depKeys = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies'
]

module.exports = prettyPrinter
function prettyPrinter (packages) {
  packages.forEach(function (pkg) {
    var repoUrl = getUrl(pkg.repository || pkg.homepage).https_url || pkg.homepage
    console.log(
      color.bold(pkg.name),
      color.dim(pkg.version),
      color.cyan(repoUrl),
      '(' + (pkg.license || 'no license') + ')')
    var lines = wordWrap(pkg.description, { width: 60 })
    lines = lines.split('\n').map(function (line) {
      return '  ' + line
    }).join('\n')
    console.log(lines)
  })
  console.log()
  console.log(color.green(color.bold('Total dependencies:')))
  depKeys.forEach(function (key) {
    console.log('  ' + color.bold(countList(packages, key)) + ' ' + key)
  })
}

function getUrl (repository) {
  if (typeof repository === 'string') {
    return ghUrl(repository)
  } else {
    return ghUrl(repository.url)
  }
}

function countList (packages, key) {
  return packages.filter(function (pkg) {
    return pkg.list === key
  }).length
}
