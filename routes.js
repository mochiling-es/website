const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

const APP_ROUTES = [{
  page: 'index',
  pattern: '/'
}, {
  page: 'index',
  pattern: '/:lang(en)'
}, {
  page: 'proposals',
  pattern: '/propuestas'
}, {
  page: 'proposals',
  pattern: '/:lang(en)/proposals'
}, {
  page: 'experiences',
  pattern: '/experiencias'
}, {
  page: 'experiences',
  pattern: '/:lang(en)/experiences'
}, {
  page: 'experience',
  pattern: '/experiencias/:memberId/:experienceId'
}, {
  page: 'experience',
  pattern: '/:lang(en)/experiences/:memberId/:experienceId'
}, {
  page: 'team',
  pattern: '/equipo'
}, {
  page: 'team',
  pattern: '/:lang(en)/team'
}, {
  page: 'member',
  pattern: '/equipo/:memberId'
}, {
  page: 'member',
  pattern: '/:lang(en)/team/:memberId'
}, {
  page: 'contact',
  pattern: '/contacto'
}, {
  page: 'contact',
  pattern: '/:lang(en)/contact'
}, {
  page: 'cookies',
  pattern: '/:lang(en)?/cookies'
}]

APP_ROUTES.forEach(route => routes.add(route))