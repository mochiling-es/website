import React, { Component } from 'react'
import { withRouter } from 'next/router'
import FontAwesome from 'react-fontawesome'
import Link from './Link'
import PropTypes from 'prop-types'

import Logo from './Logo'
import { withNamespaces, i18n } from '../../i18n'

class Header extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  onHamburguerClick = ev => {
    const { onHamburguerClick } = this.props
    ev.stopPropagation()
    ev.preventDefault()
    onHamburguerClick && onHamburguerClick()
  }

  render() {
    const { light, t, showHeader } = this.props
    const otherLang = i18n.language === 'es' ? 'en' : 'es'

    return (
      <header className={`Header ${light ? 'Header--light' : ''}`}>
        <div className="Header-child">
          <h1>
            <Link href="/">
              <a className="Header-logo">
                <span className="Header-logoObj u-rSpace--m">
                  <Logo light={!!light} />
                </span>
                <span className="Header-logoSub Text Text--strong Text--small Color--emphasis">{t('subtitle')}</span>
              </a>
            </Link>
          </h1>
        </div>

        <div className={`Header-child Header-subLinks ${showHeader ? 'is-headerVisible' : ''}`}>
          <nav className="Header-nav">
            <ul className="Header-navList Text Text--med Text--strong">
              <li className="Header-navListItem">
                <Link href={`/proposals`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{t('routes.proposals')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <Link href={`/experiences`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{t('routes.experiences')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <Link href={`/team`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{t('routes.team')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <Link href={`contact`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{t('routes.contact')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <button
                  className="Color--linkSecondary"
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')}
                >
                  <FontAwesome name="globe" /> {otherLang}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <button className="Header-child Header-hamburguer js-responsiveHeader" onClick={this.onHamburguerClick}>
          <FontAwesome className="Color--linkSecondary" name="bars" />
        </button>
      </header>
    )
  }
}

Header.propTypes = {
  light: PropTypes.bool,
  canvas: PropTypes.element,
  t: PropTypes.func.isRequired,
  showHeader: PropTypes.bool.isRequired,
  onHamburguerClick: PropTypes.func.isRequired
}

export default withNamespaces('common')(withRouter(Header))
