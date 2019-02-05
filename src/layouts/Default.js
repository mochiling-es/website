import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { size, extend } from 'lodash'
import FontAwesome from 'react-fontawesome'

import { loadDB } from '../../lib/db'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { loginUser, logoutUser, errorUser } from '../actions/UserActions'
import { fetchMembers } from '../actions/TeamActions'
import { fetchExperiences } from '../actions/ExperienceActions'

class Default extends Component {
  state = {
    showHeader: false
  }

  static async getInitialProps({ store, isServer }) {
    store.dispatch(fetchMembers())
    store.dispatch(fetchExperiences())

    return { isServer }
  }

  async componentDidMount() {
    this.props.fetchMembers()
    this.props.fetchExperiences()

    const app = await loadDB()
    app.auth().onAuthStateChanged(this.manageAuth)
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
    const { children, members, experiences } = this.props
    const { showHeader } = this.state
    const isLoading = !members || size(members) === 0 || !experiences || size(experiences) === 0
    const childrenWithHeader = React.Children.map(children, child =>
      React.cloneElement(child, null, [
        <Header key="header" onHamburguerClick={this.onHamburguerClick} showHeader={showHeader} />
      ])
    )

    if (isLoading) {
      return (
        <div className="Loader">
          <FontAwesome className="Color--desc" name="compass" size="3x" spin />
        </div>
      )
    }

    return (
      <div
        className={`Canvas ${showHeader ? 'is-headerVisible' : ''}`}
        ref={node => (this.canvas = node)}
        onClick={this.onCanvasClick}
      >
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
)(Default)
