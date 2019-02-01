import React, { Component } from 'react'
import { fetchMembers } from '../src/actions/TeamActions'
import { i18n } from '../i18n'

class Member extends Component {
  static async getInitialProps({ store, query, isServer }) {
    const { memberId } = query
    store.dispatch(fetchMembers())

    console.log(isServer)
    i18n.changeLanguage('en')

    return {
      memberId,
      namespacesRequired: ['team'],
      isServer
    }
  }

  render() {
    const { memberId } = this.props
    return <p>{memberId}</p>
  }
}

export default Member
