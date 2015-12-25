const babel = require('babel-core')
const babelRelayPlugin = require('./babelRelayPlugin')

module.exports = {
  process: function (src, filename) {
    // ignore less files
    if (filename.match(/\.less$/))
      return
    if (filename.indexOf('node_modules') === -1)
      return babel.transform(src, {
        filename: filename,
        presets: ['react', 'es2015', 'stage-0'],
        plugins: [babelRelayPlugin],
        retainLines: true
      }).code
    return src
  }
}
