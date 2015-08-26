module.exports = depCompare
function depCompare (a, b) {
  if (a.name === b.name) {
    return a.version.localeCompare(b.version)
  }
  return a.name.localeCompare(b.name)
}
