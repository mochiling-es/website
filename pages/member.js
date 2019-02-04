import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactMarkdown from 'react-markdown'
import { find, map } from 'lodash'

import Link from '../src/components/Link'
import Head from '../src/components/Head'
import StaticMap from '../src/components/StaticMap'
import LastExperiences from '../src/components/LastExperiences'
import { withNamespaces, i18n } from '../i18n'
import { fetchMembers } from '../src/actions/TeamActions'

import '../src/styles/member.scss'

class Member extends Component {
  static async getInitialProps({ store, query, isServer }) {
    const { memberId } = query

    return {
      memberId,
      namespacesRequired: ['team'],
      isServer
    }
  }

  componentDidMount() {
    this.props.fetchMembers()
  }

  render() {
    const { memberId, members, t } = this.props
    const memberData = find(members, ['id', memberId])
    const lang = i18n.language

    if (!memberId || !memberData) {
      return <p>Error</p>
    }

    // Born location
    const marker = {
      markerOffset: 0,
      name: '',
      coordinates: memberData.bornLocation
    }

    return (
      <Fragment>
        <Head title={memberData.name} description={`${memberData.name} · ${memberData.shortDesc[lang]}`} />

        <StaticMap
          countries={map(memberData.visitedCountries, country => country.toLowerCase())}
          markers={[marker]}
          center={memberData.bornLocation}
          rotation={[0, 0, 0]}
        />
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
                        <img src={`/static/assets/images/flags/${language}.png`} alt={language} title={language} />
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {memberData.longDesc && memberData.longDesc[lang] && (
              <ReactMarkdown
                source={memberData.longDesc[lang]}
                renderers={{
                  strong: props => {
                    return <span className="Color--emphasis">{props.children}</span>
                  },
                  paragraph: props => {
                    return <div className="Member-text Color Text Text--large">{props.children}</div>
                  }
                }}
              />
            )}
          </div>
        </div>

        <div className="Breadcrumb u-tSpace--xxl">
          <ul className="Breadcrumb-inner">
            <li className="Breadcrumb-item u-rSpace--xl">{t(`follow.${memberData.gender}`)}</li>

            {memberData.facebookId && (
              <li className="Breadcrumb-item u-rSpace--xl">
                <a
                  href={`http://facebook.com/${memberData.facebookId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Breadcrumb-link"
                >
                  <i className="fa fa-facebook Breadcrumb-linkIcon" />
                  <span className="Breakcrumb-linkDesc u-lSpace">Facebook</span>
                </a>
              </li>
            )}

            {memberData.twitterId && (
              <li className="Breadcrumb-item u-rSpace--xl">
                <a
                  href={`http://twitter.com/@${memberData.twitterId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Breadcrumb-link"
                >
                  <i className="fa fa-twitter Breadcrumb-linkIcon" />
                  <span className="Breakcrumb-linkDesc u-lSpace">Twitter</span>
                </a>
              </li>
            )}

            {memberData.instagramId && (
              <li className="Breadcrumb-item">
                <a
                  href={`http://instagr.am/${memberData.instagramId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Breadcrumb-link"
                >
                  <i className="fa fa-instagram Breadcrumb-linkIcon" />
                  <span className="Breakcrumb-linkDesc u-lSpace">Instagram</span>
                </a>
              </li>
            )}
          </ul>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces('team')(Member))
