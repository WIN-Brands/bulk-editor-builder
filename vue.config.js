module.exports = {
  css: {
    sourceMap: true,
    publicPath: process.env.NODE_ENV === 'production'
      ? '/bulk-editor-builder/'
      : '/'
  }
}