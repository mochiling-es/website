import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { withNamespaces } from '../i18n'

class Proposals extends Component {
  render () {
    const { t } = this.props
    return (
      <div>{t('title')}</div>
    )
  }
}

Proposals.propTypes = {
  t: PropTypes.func.isRequired
}

export default withNamespaces('proposals')(Proposals)
