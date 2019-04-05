import React, { Component } from 'react'
import { withRouter } from 'next/router'
import FontAwesome from 'react-fontawesome'
import Link from './Link'
import PropTypes from 'prop-types'

import Logo from './Logo'
import config from '../../utils/config'

class Header extends Component {
  onHamburguerClick = ev => {
    const { onHamburguerClick } = this.props
    ev.stopPropagation()
    ev.preventDefault()
    onHamburguerClick && onHamburguerClick()
  }

  render() {
    const { light, i18n, lang } = this.props
    const otherLang = lang === 'es' ? 'en' : 'es'

    return (
      <header className={`Header ${light ? 'Header--light' : ''}`}>
        <div className="Header-child">
          <h1>
            <Link page="/">
              <a className="Header-logo">
                <span className="Header-logoObj u-rSpace--m">
                  <Logo light={!!light} />
                </span>
                <span className="Header-logoSub Text Text--strong Text--small Color--emphasis">
                  {i18n.t('common:subtitle')}
                </span>
              </a>
            </Link>
          </h1>
        </div>

        <div className={`Header-child Header-subLinks`}>
          <nav className="Header-nav">
            <ul className="Header-navList Text Text--med Text--strong">
              <li className="Header-navListItem">
                <Link page={`/proposals`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{i18n.t('common:routes.proposals')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <Link page={`/experiences`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{i18n.t('common:routes.experiences')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <Link page={`/team`} activeClassName="is-selected">
                  <a className="Header-navListItemLink Color--linkSecondary">{i18n.t('common:routes.team')}</a>
                </Link>
              </li>
              <li className="Header-navListItem">
                <a href={`mailto:${config.email}`} className="Header-navListItemLink Color--linkSecondary">
                  {i18n.t('common:routes.contact')}
                </a>
              </li>
              <li className="Header-navListItem">
                <Link page={`/`} lang={otherLang} activeClassName="is-selected">
                  <a className="Color--linkSecondary">
                    <FontAwesome name="globe" /> {otherLang}
                  </a>
                </Link>
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
  i18n: PropTypes.instanceOf(Object).isRequired,
  lang: PropTypes.string,
  onHamburguerClick: PropTypes.func.isRequired
}

export default withRouter(Header)
