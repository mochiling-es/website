import React, { Component, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

import Head from '../src/components/Head'
import StaticMap from '../src/components/Map/Static'

class Cookies extends Component {
  componentWillMount = () => {
    const { i18n, lang } = this.props
    const commonData = require(`../src/locales/common`).default

    if (this.translateNS) {
      this.translateNS.forEach(element => {
        const data = require(`../src/locales/${element}`).default
        i18n.addResourceBundle(lang, element, data[lang])
      })
    }

    i18n.addResourceBundle(lang, 'common', commonData[lang])
    i18n.changeLanguage(lang)
  }

  render() {
    const { i18n, children } = this.props
    return (
      <Fragment>
        <Head i18n={i18n} title={i18n.t('cookies:title')} />

        <div className="Block">
          <StaticMap />
          {children} {/*Header*/}
          <div className="Block-content">
            <div className="Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--emphasis">{i18n.t('cookies:title')}</h2>
            </div>
          </div>
          <div className="Block-content Text u-tSpace--xxl">
            <ReactMarkdown
              source={i18n.t('cookies:content')}
              renderers={{
                paragraph: props => {
                  return <p className="Text--large Color--secondary u-tSpace--l u-bSpace--l">{props.children}</p>
                },
                link: props => {
                  const { children, ...other } = props
                  return (
                    <a className="Color--emphasis" {...other}>
                      {children}
                    </a>
                  )
                },
                heading: props => {
                  const { children, ...other } = props

                  if (props.level === 2) {
                    return <h3 className={`Color--main Text--wayBig`}>{children}</h3>
                  }

                  if (props.level === 3) {
                    return <h4 className={`Color--main Text--big u-tSpace--l`}>{children}</h4>
                  }

                  return <p {...other}>{children}</p>
                }
              }}
            />
          </div>
        </div>
      </Fragment>
    )
  }
}

Cookies.prototype.translateNS = ['cookies']

export default Cookies
