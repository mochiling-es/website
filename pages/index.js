import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchMembers } from '../src/actions/TeamActions'
import Head from '../src/components/Head'
import { withNamespaces } from '../i18n'

class Index extends Component {
  componentDidMount () {
    this.props.fetchMembers()
  }

  render () {
    const { t, members } = this.props

    return (
      <Fragment>
        <Head />
        <div>home</div>
      </Fragment>
    )
  }
}

function mapStateToProps (state) {
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
)(withNamespaces(['index', 'common'])(Index))
