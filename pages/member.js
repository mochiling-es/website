import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import ReactMarkdown from 'react-markdown'
import { find, map, extend, isEmpty } from 'lodash'
import FontAwesome from 'react-fontawesome'

// import Error from './_error'
import { loadDB } from '../lib/db'
import Link from '../src/components/Link'
import Head from '../src/components/Head'
import StaticMap from '../src/components/Map/Static'
import LastExperiences from '../src/components/LastExperiences'
import { fetchMembers } from '../src/actions/TeamActions'
import { fetchExperiences } from '../src/actions/ExperienceActions'

import '../src/styles/member.scss'

const socialTypes = ['facebook', 'instagram', 'twitter']

class Member extends Component {
  state = {
    height: 900
  }

  static async getInitialProps({ isServer, query }) {
    const { memberId } = query
    const app = await loadDB()
    const firestore = app.firestore()

    const promiseMembers = new Promise(async (resolve, reject) => {
      await firestore
        .collection('members')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          let members = []
          snapshot.forEach(function(doc) {
            members.push(extend({ id: doc.id }, doc.data()))
          })
          resolve(members)
        })
    })

    const promiseExperiences = new Promise(async (resolve, reject) => {
      await firestore
        .collection('experiences')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          let experiences = []
          snapshot.forEach(function(doc) {
            experiences.push(extend({ id: doc.id }, doc.data()))
          })
          resolve(experiences)
        })
    })

    const { members, experiences } = await Promise.all([promiseMembers, promiseExperiences]).then(function([
      members,
      experiences
    ]) {
      return { members, experiences, isServer }
    })

    return {
      members,
      experiences,
      memberId,
      isServer
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

  render() {
    const { memberId, members, i18n, children, lang, isServer } = this.props
    const { height } = this.state
    const width = !isServer ? window.innerWidth : 1000
    let yOffset, xOffset
    const memberData = find(members, ['id', memberId])
    // Born location
    const marker = {
      markerOffset: 0,
      coordinates: memberData.bornLocation || []
    }

    if (width < 900) {
      yOffset = 0
      xOffset = 0
    } else {
      yOffset = (125 - height / 4) / 2
      xOffset = -(900 / 6)
    }

    return (
      <Fragment>
        <Head
          i18n={i18n}
          title={memberData.name}
          description={`${memberData.name} · ${memberData.shortDesc[lang]}`}
          image={memberData.avatarURL}
        />

        <div className="Block" ref={node => (this.block = node)}>
          <StaticMap
            countriesCode={map(memberData.visitedCountries, countryCode => countryCode.toLowerCase())}
            markers={[marker]}
            center={memberData.bornLocation}
            yOffset={yOffset}
            xOffset={xOffset}
          />
          {children}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link page="/team">
                  <a className="Breadcrumb-link">{i18n.t('team:title')}</a>
                </Link>
              </li>
              <li className="Breadcrumb-item Breadcrumb-item--separator">></li>
              <li className="Breadcrumb-item">{memberData.name}</li>
            </ul>
          </div>
          <div className="Member-content Block-content">
            <div className="Member-contentInner">
              <div className="Member-info u-tSpace--xxl ">
                <div className="Member-image">
                  <img src={memberData.avatarURL} alt={memberData.name} title={memberData.name} />
                </div>
                <div className="Member-desc">
                  {memberData.role && (
                    <h4 className="Color--paragraph Text Text--uppercase Text--med">
                      {i18n.t(`team:role.${memberData.role}`)}
                    </h4>
                  )}
                  <h2 className="Color--main Text Text--giant Text--strong">{memberData.name}</h2>
                  <ul className="Member-languages u-tSpace">
                    {map(memberData.languages, language => {
                      return (
                        <li key={language} className="Member-language">
                          {language}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {memberData.longDesc && memberData.longDesc[lang] && (
                <ReactMarkdown
                  source={memberData.longDesc[lang]}
                  className="Member-text Color Text Text--large"
                  renderers={{
                    strong: props => {
                      return <span className="Color--emphasis">{props.children}</span>
                    }
                  }}
                />
              )}
            </div>
          </div>
          <div className="Breadcrumb u-tSpace--xxl">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item u-rSpace--xl">{i18n.t(`team:follow.${memberData.gender}`)}</li>

              {map(socialTypes, socialName => {
                if (memberData[`${socialName}Id`]) {
                  return (
                    <li key={`${memberData.id}-${socialName}`} className="Breadcrumb-item u-rSpace--xl">
                      <a
                        href={`http://${socialName}.com/${memberData.facebookId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="Breadcrumb-link"
                      >
                        <FontAwesome name={socialName} className="Breadcrumb-linkIcon" />
                        <span className="Breakcrumb-linkDesc u-lSpace">{socialName}</span>
                      </a>
                    </li>
                  )
                } else {
                  return null
                }
              })}
            </ul>
          </div>
        </div>

        <LastExperiences i18n={i18n} limit={6} lang={lang} />
      </Fragment>
    )
  }
}

Member.prototype.translateNS = ['experiences', 'team']

Member.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
  return {
    members: isEmpty(state.members) ? props.members : state.members,
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
)(Member)
