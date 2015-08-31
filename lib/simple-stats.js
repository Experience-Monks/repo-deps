var semver = require('semver')

module.exports = getSimpleStats
function getSimpleStats (package) {
  var stats = package.stats
  if (!stats) {
    return null
  }
  delete package.stats
  
  // Try to find best version given the semver range
  var versionRange = package.version
  var allVersions = Object.keys(stats.versions)
  var bestVersion
  for (var i=allVersions.length-1; i>=0; i--) {
    var npmVers = allVersions[i]
    if (semver.satisfies(npmVers, versionRange)) {
      bestVersion = npmVers
      break
    }
  }
  
  // can't find best version, just go to dist-tag latest
  if (!bestVersion) {
    bestVersion = stats['dist-tags'] && stats['dist-tags'].latest
  }
  
  // no versions on package! maybe it has been unpublished?
  if (!bestVersion) return package

  var info = stats.versions[bestVersion]
  return {
    list: package.list,
    maintainers: stats.maintainers,
    author: stats.author,
    homepage: stats.homepage,
    repository: stats.repository,
    keywords: stats.keywords,
    license: info.license || stats.license,
    description: info.description || stats.description,
    version: bestVersion,
    packageVersion: versionRange,
    name: info.name || stats.name || package.name
  }
}