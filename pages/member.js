import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactMarkdown from 'react-markdown'
import { find, map, debounce } from 'lodash'
import FontAwesome from 'react-fontawesome'
import { translate } from 'react-i18next'

import Error from './_error'
import Link from '../src/components/Link'
import Head from '../src/components/Head'
import StaticMap from '../src/components/StaticMap'
import LastExperiences from '../src/components/LastExperiences'
import { i18nHelper, wrapper } from '../src/components/i18n'

import { fetchMembers } from '../src/actions/TeamActions'

import '../src/styles/member.scss'

const socialTypes = ['facebook', 'instagram', 'twitter']

class Member extends Component {
  state = {
    height: 900
  }

  static async getInitialProps({ store, query, isServer }) {
    const { memberId } = query

    return {
      memberId,
      namespacesRequired: ['team'],
      isServer
    }
  }

  updateDimensions = debounce(() => {
    const height = this.block.offsetHeight

    this.setState({ height: height })
  }, 500)

  componentWillMount = () => {
    this.updateDimensions()
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { memberId, members, t, children } = this.props
    const { height } = this.state
    const width = window.innerWidth
    const memberData = find(members, ['id', memberId])
    const lang = i18nHelper.getCurrentLanguage()
    let yOffset, xOffset

    if (!memberId || !memberData) {
      return <Error status={404} />
    }

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
          title={memberData.name}
          description={`${memberData.name} · ${memberData.shortDesc[lang]}`}
          image={memberData.avatarURL}
        />

        <div className="Block" ref={node => (this.block = node)}>
          <StaticMap
            countriesCode={map(memberData.visitedCountries, countryCode => countryCode.toLowerCase())}
            markers={[marker]}
            center={memberData.bornLocation}
            scale={300}
            height={height}
            yOffset={yOffset}
            xOffset={xOffset}
            width={window.innerWidth}
          />
          {children} {/*Header*/}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link href="/team">
                  <a className="Breadcrumb-link">{t('title')}</a>
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
                    <h4 className="Color--paragraph Text Text--uppercase Text--med">{t(`roles.${memberData.role}`)}</h4>
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
              <li className="Breadcrumb-item u-rSpace--xl">{t(`follow.${memberData.gender}`)}</li>

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

        <LastExperiences limit={10} />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    members: state.members
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch)
  }
}

export default wrapper(translate(['team'])(connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)))
