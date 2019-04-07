import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Lockr from 'lockr'

import Link from './Link'

class Cookies extends Component {
  state = {
    visible: false
  }

  onClick = () => {
    Lockr.set('mochiling.cookies', true)
    this.setState({ visible: false })
  }

  componentDidMount = () => {
    if (!Lockr.get('mochiling.cookies')) {
      this.setState({ visible: true })
    }
  }

  render() {
    const { i18n, router } = this.props
    const { visible } = this.state

    if (!visible || router.pathname === '/cookies') {
      return null
    }

    return (
      <div className="Cookies-disclaimer">
        <div className="Block-content Cookies-disclaimerInner Text">
          <Link page="/cookies">
            <a className="Text--med Color--secondary">{i18n.t('common:disclaimer')}.</a>
          </Link>
          <button className="Text--med Text--strong Color--linkSecondary" onClick={this.onClick}>
            <FontAwesome name="times" />
          </button>
        </div>
      </div>
    )
  }
}

export default Cookies
