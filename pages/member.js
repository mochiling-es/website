import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { find } from 'lodash'

import { withNamespaces } from '../i18n'
import { fetchMembers } from '../src/actions/TeamActions'

class Member extends Component {
  static async getInitialProps({ store, query, isServer }) {
    const { memberId } = query
    store.dispatch(fetchMembers())

    return {
      memberId,
      namespacesRequired: ['team'],
      isServer
    }
  }

  componentDidMount() {
    this.props.fetchMembers()
  }

  render() {
    const { memberId, members } = this.props
    const memberData = find(members, ['id', memberId])

    console.log(members)
    return (
      <div>
        <p>{memberId}</p> {memberData && memberData.name}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    members: state.members
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces('team')(Member))
