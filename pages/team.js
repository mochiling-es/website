import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from '../i18n'
import StaticMap from '../src/components/StaticMap'


class Team extends Component {

  render () {
    return (
      <div style={{ height: '1999px'}}>
        <StaticMap />
      </div>
    )
  }
}

Team.propTypes = {
  t: PropTypes.func.isRequired
}

export default withNamespaces('team')(Team)