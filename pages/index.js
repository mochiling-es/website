import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'

import { wrapper } from '../src/components/i18n'
import { fetchMembers } from '../src/actions/TeamActions'

class Index extends Component {
  componentDidMount() {
    this.props.fetchMembers()
  }

  render() {
    const { t, members } = this.props

    return (
      <Fragment>
        <div>hola</div>
      </Fragment>
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
)((Index))
