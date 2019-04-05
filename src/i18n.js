import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const options = {
  fallbackLng: 'es',
  load: 'languageOnly',
  ns: ['common'],
  defaultNS: 'common',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },
  wait: process && !process.release
}

if (process && !process.release) {
  i18n.use(initReactI18next)
}

if (!i18n.isInitialized) {
  i18n.init(options)
}

export default i18n
