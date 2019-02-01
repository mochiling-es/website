const path = require('path')
const express = require('express')
const compression = require('compression')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
// const axios = require('axios')

const routes = require('./routes')
const nextI18next = require('../i18n')

const port = parseInt(process.env.PORT, 10) || 3100
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handler = routes.getRequestHandler(app)

// const determinePriority = (url) => {
//   if (url.includes('experiences/')) {
//     return 0.6
//   } else if (url.includes('blog/')) {
//     return 0.8
//   } else {
//     return 1.0
//   }
// }

// const createSitemap = res => {
//   let urlRoutes = []

//   let sitemap = sm.createSitemap({
//     hostname: 'base url of site',
//     cacheTime: 60
//   })

//   axios.get('rest endpoint of dynamic page slugs').then(function(response) {
//     urlRoutes = [...urlRoutes, ...response.data]
//     urlRoutes.map(item => {
//       sitemap.add({
//         url: item,
//         changefreq: 'daily',
//         priority: determinePriority(item)
//       })
//     })
//     res.send(sitemap.toString())
//   })
// }

app.prepare().then(() => {
  const server = express()

  server.use(compression()).use(nextI18NextMiddleware(nextI18next))

  const staticPath = path.join(__dirname, '../static')
  server.use(
    '/static',
    express.static(staticPath, {
      maxAge: '30d',
      immutable: true
    })
  )

  // server.get('/sitemap.xml', function(req, res) {
  //   res.header('Content-Type', 'application/xml')
  //   createSitemap(res)
  // })

  server.get('*', (req, res) => {
    return handler(req, res)
  })

  startServer()

  function startServer () {
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  }
})
