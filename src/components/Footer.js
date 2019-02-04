import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import config from '../../utils/config'

class Footer extends Component {
  render() {
    const year = new Date().getFullYear()

    return (
      <footer className="Footer">
        <div className="Footer-inner">
          <p className="u-lSpace--xl Text Text--med Color--paragraph">
            © {year} {config.name}.es
          </p>
          <nav className="Footer-nav">
            <ul className="Footer-navList">
              <li className="Footer-navListItem">
                <a
                  href={`https://facebook.com/${config.facebookId}`}
                  className="Text Text--med Color--linkSecondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesome name="facebook" />
                </a>
              </li>
              <li className="Footer-navListItem">
                <a
                  href={`https://instagram.com/${config.instagramId}`}
                  className="Text Text--med Color--linkSecondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesome name="instagram" />
                </a>
              </li>
              <li className="Footer-navListItem">
                <a
                  href={`https://twitter.com/${config.twitterId}`}
                  className="Text Text--med Color--linkSecondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesome name="twitter" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    )
  }
}

export default Footer
