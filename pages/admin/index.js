import React, { Component, Fragment } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/auth'

import { withNamespaces } from '../../i18n'
import StaticMap from '../../src/components/StaticMap'

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

    console.log(user)

    return (
      <div className="Login">
        <StaticMap />
        {user.state === 'logged' && (
          <Fragment>
            <img width="60" src={user.photoURL} alt={user.displayName} title={user.displayName} />
            <h3 className="mt2 as-body as-font--semibold as-color--type-01">
              {t('hello', { name: user.displayName })}!
            </h3>

            <button className="mt2 as-button as-button--small as-button--primary" onClick={this.onLogout}>
              <span className="as-caption as-link as-font--semibold relative ttu">sign out</span>
            </button>
          </Fragment>
        )}

        {user.state === 'loading' && <FontAwesome className="Color--desc" name="compass" size="3x" spin />}

        {user.state === 'idle' && (
          <Fragment>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            {user.error && <p className="as-caption as-font--semibold as-color--error">{user.error}</p>}
          </Fragment>
        )}
      </div>
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
