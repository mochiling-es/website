import React, { Component } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { fetchMembers } from '../actions/TeamActions'

class Default extends Component {
  static async getInitialProps ({ store, isServer }) {
    store.dispatch(fetchMembers())

    return { isServer }
  }

  render () {
    const { children } = this.props
    return (
      <div className='Canvas js-canvas'>
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Default
