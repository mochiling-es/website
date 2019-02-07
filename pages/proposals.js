import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { wrapper } from '../src/components/i18n'

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

export default wrapper(translate(['proposals'])(Proposals))
