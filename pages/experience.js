import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { find, size, map, filter } from 'lodash'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'
import Hotkeys from 'react-hot-keys'

import Error from './_error'
import Link from '../src/components/Link'
import Authors from '../src/components/Authors'
import Head from '../src/components/Head'
import ExperiencesAround from '../src/components/ExperiencesAround'
import { wrapper, i18nHelper } from '../src/components/i18n'
import NextExperience from '../src/components/NextExperience'

import '../src/styles/experience.scss'

class Experience extends Component {
  state = {
    displayVideo: false
  }

  static async getInitialProps({ store, query, isServer }) {
    const { experienceSlug, memberId } = query

    return {
      memberId,
      experienceSlug,
      isServer
    }
  }

  onVideoClick = () => {
    this.setState({ displayVideo: true })
  }

  onEsc = () => {
    this.setState({ displayVideo: false })
  }

  render() {
    const { memberId, members, experiences, experienceSlug, user, t, children } = this.props
    const { displayVideo } = this.state
    const isUserLogged = user.state === 'logged'
    let experienceData = {}
    let nextExperience
    let experiencePosition
    const lang = i18nHelper.getCurrentLanguage()
    const otherExperiences = filter(experiences, experience => {
      if (isUserLogged) {
        return true
      } else if (experience.published) {
        return true
      } else {
        return false
      }
    })

    if (experienceSlug && memberId) {
      experienceData = find(otherExperiences, (experience, pos) => {
        if (experience.slug === experienceSlug && experience.authors.includes(memberId)) {
          experiencePosition = pos
          return true
        } else {
          return false
        }
      })

      if (!experienceData) {
        return <Error status={404} children={children} />
      }
    } else {
      return <Error status={404} children={children} />
    }

    const title = (experienceData.title && experienceData.title[lang]) || ''
    const subtitle = (experienceData.title && experienceData.subtitle[lang]) || ''
    const shortDesc = (experienceData.title && experienceData.shortDesc[lang]) || ''
    const longDesc = (experienceData.title && experienceData.longDesc[lang]) || ''

    const { authors, youtubeURL, imagesListURL, instagramTag, mainImageURL } = experienceData

    if (size(otherExperiences) > 1) {
      let nextExperiencePos = experiencePosition + 1
      if (nextExperiencePos >= size(otherExperiences)) {
        nextExperiencePos = 0
      }

      nextExperience = otherExperiences[nextExperiencePos]
    }

    return (
      <Fragment>
        <Head title={title} description={shortDesc} image={experienceData.mainImageURL} />
        <Hotkeys keyName="esc" onKeyDown={this.onEsc}>
          <div className="Block Experience" ref={node => (this.block = node)}>
            {children} {/*Header*/}
            <div className="Breadcrumb">
              <ul className="Breadcrumb-inner">
                <li className="Breadcrumb-item">
                  <Link href="/experiences">
                    <a className="Breadcrumb-link">{t('title')}</a>
                  </Link>
                </li>
                <li className="Breadcrumb-item Breadcrumb-item--separator">></li>
                <li className="Breadcrumb-item">{title}</li>
              </ul>
            </div>
            <div className="Experience-wrapper">
              <div className="Experience-image">
                <img src={mainImageURL} className="Experience-imageItem" alt={title} title={title} />
              </div>
              <div className="Experience-content Text--withShadow Block-content">
                <div className="Experience-contentInfo">
                  <h4 className="Color--light Text Text--uppercase Text--med">{subtitle}</h4>
                  <h2 className="Color--light Text Text--giant Text--strong">{title}</h2>
                  <Authors members={members} authors={authors} />

                  <div className="Experience-text u-tSpace--xl">
                    <p className="Text Text--large Color--light Paragraph">{longDesc}</p>
                  </div>

                  <div className="Experience-social Color--light u-tSpace--m">
                    <ul className="Experience-socialList">
                      {youtubeURL && (
                        <li className="u-rSpace--xl">
                          <button className="js-playVideo" data-tip data-for={'youtube'} onClick={this.onVideoClick}>
                            <FontAwesome name="youtube-play" size="2x" />
                            <ReactTooltip effect="solid" place="top" type="light" id={'youtube'}>
                              <span className="Text Text--med Experience-text--noShadow">{t('youtube-video')}</span>
                            </ReactTooltip>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <ExperiencesAround currentExperience={experienceData} experiences={experiences} />
              </div>

              {youtubeURL && displayVideo && (
                <iframe
                  title={title}
                  src={youtubeURL}
                  width={'100%'}
                  height={'100%'}
                  frameBorder={0}
                  allowFullScreen
                  className="Experience-video"
                />
              )}
            </div>
            {instagramTag && (
              <div className="Breadcrumb">
                <ul className="Breadcrumb-inner">
                  <li className="Breadcrumb-item u-rSpace--xl">Instagram</li>
                  <li className="Breadcrumb-item u-rSpace--xl">
                    <a
                      href={`https://www.instagram.com/explore/tags/${experienceData.instagramTag}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Breadcrumb-link"
                    >
                      <span className="Breakcrumb-linkDesc u-lSpace">#{instagramTag}</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
            {imagesListURL && (
              <ul className="Experience-photos">
                {map(imagesListURL, image => {
                  return (
                    <li key={image} className="cell">
                      <img src={image} alt={title} title={title} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {nextExperience && <NextExperience experienceData={nextExperience} />}
        </Hotkeys>
      </Fragment>
    )
  }
}

Experience.propTypes = {
  t: PropTypes.func.isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired,
  user: PropTypes.instanceOf(Object).isRequired
}

function mapStateToProps(state) {
  return {
    members: state.members,
    experiences: state.experiences,
    user: state.user
  }
}

export default wrapper(translate(['experiences'])(connect(mapStateToProps)(Experience)))
