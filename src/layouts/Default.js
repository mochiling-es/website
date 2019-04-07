import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { extend } from 'lodash'
import { withRouter } from 'next/router'

import { loadDB } from '../../lib/db'
import i18n from '../i18n'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cookies from '../components/Cookies'
import { loginUser, logoutUser, errorUser } from '../actions/UserActions'
import { fetchMembers } from '../actions/TeamActions'
import { fetchExperiences } from '../actions/ExperienceActions'

class Default extends Component {
  state = {
    showHeader: false
  }

  async componentDidMount() {
    const app = await loadDB()

    this.props.fetchMembers()
    this.props.fetchExperiences()

    app.auth().onAuthStateChanged(this.manageAuth)
  }

  componentWillMount = () => {
    this.i18n = i18n
  }

  manageAuth = user => {
    if (user) {
      this.props.loginUser(
        extend(user.toJSON(), {
          state: 'loading'
        })
      )

      user.getIdTokenResult().then(idTokenResult => {
        if (!!idTokenResult.claims.admin) {
          this.props.loginUser({
            state: 'logged'
          })
        } else {
          this.props.errorUser({
            state: 'error'
          })
        }
      })
    } else {
      this.props.logoutUser()
    }
  }

  onHamburguerClick = () => {
    this.setState({ showHeader: true })
  }

  onCanvasClick = () => {
    this.setState({ showHeader: false })
  }

  render() {
    const { children, router, lang } = this.props
    const { showHeader } = this.state
    const childrenWithHeader = React.Children.map(children, child =>
      React.cloneElement(
        child,
        {
          i18n: this.i18n
        },
        [
          <Header
            key="header"
            lang={lang}
            i18n={this.i18n}
            light={router.route === '/proposals' ? true : false}
            onHamburguerClick={this.onHamburguerClick}
          />
        ]
      )
    )

    return (
      <div
        className={`Canvas ${showHeader ? 'is-headerVisible' : ''}`}
        ref={node => (this.canvas = node)}
        onClick={this.onCanvasClick}
      >
        <Cookies i18n={this.i18n} router={router} />
        {childrenWithHeader}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    members: state.members,
    experiences: state.experiences,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch),
    fetchExperiences: bindActionCreators(fetchExperiences, dispatch),
    loginUser: bindActionCreators(loginUser, dispatch),
    logoutUser: bindActionCreators(logoutUser, dispatch),
    errorUser: bindActionCreators(errorUser, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Default))
