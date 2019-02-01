const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
const port = parseInt(process.env.PORT, 10) || 3000
const nextI18next = require('../i18n')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(nextI18NextMiddleware(nextI18next))

  server.get('/team/:memberId', (req, res) => {
    const { query, params } = req
    return app.render(req, res, '/member', { ...query, memberId: params.memberId })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
