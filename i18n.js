const NextI18Next = require('next-i18next')

module.exports = new NextI18Next({
  browserLanguageDetection: false,
  serverLanguageDetection: false,
  defaultLanguage: 'es',
  otherLanguages: ['en']
})
