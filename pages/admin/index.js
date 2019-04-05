import React, { Component, Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import StaticMap from '../../src/components/Map/Static'
import Head from '../../src/components/Head'
import { loadDB } from '../../lib/db'

import '../../src/styles/admin.scss'

class Admin extends Component {
  componentWillMount = () => {
    const { i18n, lang } = this.props
    const commonData = require(`../../src/locales/common`).default

    if (this.translateNS) {
      this.translateNS.forEach(element => {
        const data = require(`../../src/locales/${element}`).default
        i18n.addResourceBundle(lang, element, data[lang])
      })
    }

    i18n.addResourceBundle(lang, 'common', commonData[lang])
    i18n.changeLanguage(lang)
  }

  onLogout = async () => {
    const app = await loadDB()
    app.auth().signOut()
  }

  onLogin = async () => {
    const app = await loadDB()
    var provider = new app.auth.GoogleAuthProvider()
    app.auth().signInWithPopup(provider)
  }

  render() {
    const { user, i18n, children } = this.props

    return (
      <Fragment>
        <Head i18n={i18n} title={i18n.t('title')} description="" />

        <div className="Block">
          <StaticMap />
          {children} {/*Header*/}
          <div className="Login">
            {user.state === 'logged' && (
              <Fragment>
                <img
                  className="Login--avatar"
                  width="60"
                  src={user.photoURL}
                  alt={user.displayName}
                  title={user.displayName}
                />
                <h3 className="Text--big Color--main u-tSpace--l">
                  {i18n.t('admin:hello', { name: user.displayName })}!
                </h3>

                <button className="Button Button--secondary u-tSpace--l" onClick={this.onLogout}>
                  {i18n.t('admin:logout')}
                </button>
              </Fragment>
            )}
            {user.state === 'loading' && <FontAwesome className="Color--desc" name="compass" size="3x" spin />}
            {(user.state === 'error' || user.state === 'idle') && (
              <Fragment>
                <button className="Button Button--action" onClick={this.onLogin}>
                  Login
                </button>
                {user.state === 'error' && <p className="Text--med Color--error">{i18n.t('admin:error')}</p>}
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

Admin.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.array.isRequired
}

Admin.prototype.translateNS = ['admin']

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Admin)
