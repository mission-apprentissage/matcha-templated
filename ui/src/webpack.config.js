const webpack = require('webpack')
module.exports = {
  plugins: [
    // load `moment/locale/fr.js`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr/),
  ],
}
