const withSass = require('@zeit/next-sass')

const sassConfig = {
  sassLoaderOptions: {
    includePaths: ['src/styles'],
    outputStyle: 'compressed'
  },
  target: 'serverless'
}

module.exports = withSass(sassConfig)
