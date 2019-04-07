import React, { Component } from 'react'
import Lockr from 'lockr'

class IntroVideo extends Component {
  state = {
    visible: false
  }

  hideVideo = () => {
    Lockr.set('mochiling.video', true)
    this.setState({ visible: false })
  }

  showVideo = () => {
    this.setState({ visible: true })
  }

  componentDidMount = () => {
    if (!Lockr.get('mochiling.video')) {
      this.setState({ visible: true })
    }
  }

  render() {
    const { visible } = this.state

    if (!visible) {
      return (
        <button className="EmbedVideo-buttonPlay" onClick={this.showVideo}>
          <i class="fa fa-play" size="2x" />
        </button>
      )
    }

    return (
      <div className="EmbedVideo">
        <iframe
          title="Mochiling intro"
          src="https://www.youtube.com/embed/8HM5zKnj_lM?rel=0&amp;showinfo=0"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        />
        <button className="EmbedVideo-button" onClick={this.hideVideo}>
          <i class="fa fa-times" />
        </button>
      </div>
    )
  }
}

export default IntroVideo
