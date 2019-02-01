import React, { Component } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Default extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="Canvas js-canvas">
        <Header />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Default
