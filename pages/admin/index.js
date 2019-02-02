import React, { Component, Fragment } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/auth'

import { withNamespaces } from '../../i18n'
import StaticMap from '../../src/components/StaticMap'
import Head from '../../src/components/Head'

import '../../src/styles/admin.scss'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
}

class Admin extends Component {
  onLogout = () => {
    firebase.auth().signOut()
  }

  render() {
    const { user, t } = this.props

    return (
      <Fragment>
        <Head title={t('title')} description="" />
        <div className="Login">
          <StaticMap />
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
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              {user.state === 'error' && <p className="Text--med Color--error">{t('error')}</p>}
            </Fragment>
          )}
        </div>
      </Fragment>
    )
  }
}

Admin.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(withNamespaces(['admin'])(Admin))
