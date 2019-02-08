import React, { Component, Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import StaticMap from '../../src/components/StaticMap'
import { wrapper } from '../../src/components/i18n'
import Head from '../../src/components/Head'

import '../../src/styles/admin.scss'

class Admin extends Component {
  onLogout = () => {
    firebase.auth().signOut()
  }

  onLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
  }

  render() {
    const { user, t, children } = this.props

    return (
      <Fragment>
        <Head title={t('title')} description="" />

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
                <h3 className="Text--big Color--main u-tSpace--l">{t('hello', { name: user.displayName })}!</h3>

                <button className="Button Button--secondary u-tSpace--l" onClick={this.onLogout}>
                  {t('logout')}
                </button>
              </Fragment>
            )}
            {user.state === 'loading' && <FontAwesome className="Color--desc" name="compass" size="3x" spin />}
            {(user.state === 'error' || user.state === 'idle') && (
              <Fragment>
                <button className="Button Button--action" onClick={this.onLogin}>
                  Login
                </button>
                {user.state === 'error' && <p className="Text--med Color--error">{t('error')}</p>}
              </Fragment>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

Admin.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default wrapper(translate(['admin'])(connect(mapStateToProps)(Admin)))
