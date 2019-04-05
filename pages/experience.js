import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { find, size, map, filter, extend, isEmpty } from 'lodash'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'
import Hotkeys from 'react-hot-keys'

import { loadDB } from '../lib/db'
import Error from './_error'
import Link from '../src/components/Link'
import Authors from '../src/components/Authors'
import Head from '../src/components/Head'
import ExperiencesAround from '../src/components/ExperiencesAround'
import NextExperience from '../src/components/NextExperience'
import { fetchMembers } from '../src/actions/TeamActions'
import { fetchExperiences } from '../src/actions/ExperienceActions'

import '../src/styles/experience.scss'

class Experience extends Component {
  state = {
    displayVideo: false
  }

  static async getInitialProps({ isServer, query }) {
    const { experienceSlug, memberId } = query
    const app = await loadDB()
    const firestore = app.firestore()

    const promise = new Promise(async (resolve, reject) => {
      await firestore
        .collection('experiences')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          let data = []
          snapshot.forEach(function(doc) {
            data.push(extend({ id: doc.id }, doc.data()))
          })
          resolve(data)
        })
    })

    const { experiences } = await Promise.all([promise]).then(function([experiences]) {
      return { experiences }
    })

    return {
      memberId,
      experienceSlug,
      experiences
    }
  }

  componentWillMount = () => {
    const { i18n, lang } = this.props
    const commonData = require(`../src/locales/common`).default

    if (this.translateNS) {
      this.translateNS.forEach(element => {
        const data = require(`../src/locales/${element}`).default
        i18n.addResourceBundle(lang, element, data[lang])
      })
    }

    i18n.addResourceBundle(lang, 'common', commonData[lang])
    i18n.changeLanguage(lang)
  }

  onVideoClick = () => {
    this.setState({ displayVideo: true })
  }

  onEsc = () => {
    this.setState({ displayVideo: false })
  }

  render() {
    const { memberId, members, experiences, experienceSlug, user, i18n, lang, children } = this.props
    const { displayVideo } = this.state
    const isUserLogged = user.state === 'logged'
    let experienceData = {}
    let nextExperience
    let experiencePosition
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
        return <Error status={404} children={children} i18n={i18n} lang={lang} />
      }
    } else {
      return <Error status={404} children={children} i18n={i18n} lang={lang} />
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
        <Head i18n={i18n} title={title} description={shortDesc} image={experienceData.mainImageURL} />
        <Hotkeys keyName="esc" onKeyDown={this.onEsc}>
          <div className="Block Experience" ref={node => (this.block = node)}>
            {children} {/*Header*/}
            <div className="Breadcrumb">
              <ul className="Breadcrumb-inner">
                <li className="Breadcrumb-item">
                  <Link page="/experiences">
                    <a className="Breadcrumb-link">{i18n.t('experiences:title')}</a>
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
                  <Authors members={members} authors={authors} i18n={i18n} />

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
                              <span className="Text Text--med Experience-text--noShadow">
                                {i18n.t('experiences:youtube-video')}
                              </span>
                            </ReactTooltip>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <ExperiencesAround
                  currentExperience={experienceData}
                  experiences={experiences}
                  i18n={i18n}
                  lang={lang}
                />
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

          {nextExperience && <NextExperience experienceData={nextExperience} i18n={i18n} lang={lang} />}
        </Hotkeys>
      </Fragment>
    )
  }
}

Experience.prototype.translateNS = ['experiences']

Experience.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
  return {
    members: isEmpty(state.members) ? props.members : state.members,
    user: state.user,
    experiences: isEmpty(state.experiences) ? props.experiences : state.experiences
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch),
    fetchExperiences: bindActionCreators(fetchExperiences, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience)
