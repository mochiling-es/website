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

  componentWillMount = () => {
    const { experiences } = this.props
    const maximum = size(experiences) - 1
    const minimum = 0
    this.setState({ index: Math.floor(Math.random() * (maximum - minimum + 1)) + minimum })
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
    const { experiences, isUserLogged } = this.props
    const { index } = this.state
    const experience = experiences[index]
    const { slug, title, mainImageURL, shortDesc, authors } = experience
    const firstAuthor = first(authors)
    const lang = i18nHelper.getCurrentLanguage()

    return (
      <div className={`Popup Popup--vertical ${!experience.published ? 'is-unpublished' : ''}`}>
        <div className="Popup-image">
          <FontAwesome name="circle-o-notch" size="2x" spin className="Color--emphasis Popup-imageLoader" />

          <Link
            as={`/experience/${firstAuthor}/${slug}`}
            href={`/experience?memberId=${firstAuthor}&experienceSlug=${slug}`}
          >
            <a>
              <img src={mainImageURL} alt={title && title[lang]} title={title && title[lang]} />
            </a>
          </Link>
          {isUserLogged && (
            <Link
              as={`/experience/${firstAuthor}/${slug}/edit`}
              href={`/admin/experience?memberId=${firstAuthor}&experienceSlug=${slug}`}
            >
              <a className="Popup-experienceEdit">
                <FontAwesome name="pencil" className="Color--action" />
              </a>
            </Link>
          )}

          {size(experiences) > 1 && (
            <Fragment>
              <button type="button" className="Popup-arrow Popup-arrow--left js-left" onClick={this.prevExperience}>
                <FontAwesome name="angle-left" />
              </button>
              <button type="button" className="Popup-arrow Popup-arrow--right" onClick={this.nextExperience}>
                <FontAwesome name="angle-right" />
              </button>
            </Fragment>
          )}
        </div>
        <div className="Popup-info Text">
          <h4 className="Text--large">
            <Link
              as={`/experience/${firstAuthor}/${slug}`}
              href={`/experience?memberId=${firstAuthor}&experienceSlug=${slug}`}
            >
              <a className="Color--emphasis">
                {title && title[lang]}
                <FontAwesome name="link" className="Popup-link u-lSpace" />
              </a>
            </Link>
          </h4>
          <p className="Text--med Color--paragraph u-tSpace--m">{shortDesc && shortDesc[lang]}</p>
        </div>
      </div>
    )
  }
}

ExperiencePopUp.propTypes = {
  experiences: PropTypes.array.isRequired
}

export default ExperiencePopUp
