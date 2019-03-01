import React, { Component, Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import { first, size } from 'lodash'
import PropTypes from 'prop-types'

import Link from '../Link'
import { i18nHelper } from '../i18n'

class ExperiencePopUp extends Component {
  state = {
    index: 0
  }

  nextExperience = event => {
    event.preventDefault()
    event.stopPropagation()
    const { experiences } = this.props
    const { index } = this.state
    this.setState({ index: index + 1 >= size(experiences) ? 0 : index + 1 })
  }

  prevExperience = event => {
    event.preventDefault()
    event.stopPropagation()
    const { experiences } = this.props
    const { index } = this.state
    this.setState({ index: index - 1 < 0 ? size(experiences) - 1 : index - 1 })
  }

  render() {
    const { experiences } = this.props
    const { index } = this.state
    const experience = experiences[index]
    const { slug, title, mainImageURL, shortDesc, authors } = experience
    const firstAuthor = first(authors)
    const lang = i18nHelper.getCurrentLanguage()

    return (
      <Link
        as={`/experience/${firstAuthor}/${slug}`}
        href={`/experience?memberId=${firstAuthor}&experienceSlug=${slug}`}
      >
        <a className="Popup Popup--vertical">
          <div className="Popup-image">
            <FontAwesome name="circle-o-notch" size="2x" spin className="Color--emphasis Popup-imageLoader" />
            <img src={mainImageURL} alt={title && title[lang]} title={title && title[lang]} />

            {size(experiences) > 1 && (
              <Fragment>
                <button type="button" class="Popup-arrow Popup-arrow--left js-left" onClick={this.prevExperience}>
                  <FontAwesome name="angle-left" />
                </button>
                <button type="button" class="Popup-arrow Popup-arrow--right" onClick={this.nextExperience}>
                  <FontAwesome name="angle-right" />
                </button>
              </Fragment>
            )}
          </div>
          <div className="Popup-info Text">
            <h4 className="Text--large Color--secondary">
              {title && title[lang]}
              <FontAwesome name="link" className="Popup-link u-lSpace" />
            </h4>
            <p className="Text--med Color--paragraph u-tSpace--m">{shortDesc && shortDesc[lang]}</p>
          </div>
        </a>
      </Link>
    )
  }
}

ExperiencePopUp.propTypes = {
  experiences: PropTypes.array.isRequired
}

export default ExperiencePopUp
