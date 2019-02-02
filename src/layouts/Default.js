import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { size } from 'lodash'
import FontAwesome from 'react-fontawesome'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchMembers } from '../actions/TeamActions'
import { fetchExperiences } from '../actions/ExperienceActions'

class Default extends Component {
  static async getInitialProps({ store, isServer }) {
    store.dispatch(fetchMembers())
    store.dispatch(fetchExperiences())

    return { isServer }
  }

  componentDidMount() {
    this.props.fetchMembers()
    this.props.fetchExperiences()
  }

  render() {
    const { children, members, experiences } = this.props
    const isLoading = !members || size(members) === 0 || !experiences || size(experiences) === 0

    if (isLoading) {
      return (
        <div className="Loader">
          <FontAwesome className="Color--desc" name="compass" size="3x" spin />
        </div>
      )
    }

    return (
      <div className="Canvas js-canvas">
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    members: state.members,
    experiences: state.experiences
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch),
    fetchExperiences: bindActionCreators(fetchExperiences, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Default)
