import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { extend, find, map, filter, isEmpty } from 'lodash'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Trans } from 'react-i18next'

import { loadDB } from '../lib/db'
import StaticMap from '../src/components/Map/Static'
import Head from '../src/components/Head'
import Link from '../src/components/Link'
import MemberListItem from '../src/components/MemberListItem'
import config from '../utils/config'
import LastExperiences from '../src/components/LastExperiences'
import { fetchMembers } from '../src/actions/TeamActions'
import { fetchExperiences } from '../src/actions/ExperienceActions'

import '../src/styles/team.scss'

class Team extends Component {
  static async getInitialProps({ isServer }) {
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

    const { members } = await Promise.all([promiseMembers]).then(function([members]) {
      return { members }
    })

    return {
      members
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
    const { i18n, members, children, user, lang } = this.props

    const isUserLogged = user.state === 'logged'
    const founderData = find(members, member => {
      if (member.role === 'founder') {
        if (!isUserLogged) {
          return member.published
        } else {
          return true
        }
      } else {
        return false
      }
    })
    const restMembers = filter(members, member => {
      if (member.role !== 'founder') {
        if (!isUserLogged) {
          return member.published
        } else {
          return true
        }
      } else {
        return false
      }
    })

    const ContactUs = () => {
      return (
        <a href={`mailto:${config.email}`} className="Color--linkSecondary">
          {i18n.t('common:contact-us')}
        </a>
      )
    }

    return (
      <Fragment>
        <Head i18n={i18n} title={i18n.t('team:title')} description={i18n.t('team:desc')} />

        <div className="Block">
          <StaticMap />
          {children} {/*Header*/}
          <div className="Block-content">
            <div className="Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--emphasis">{i18n.t('team:subtitle')}</h2>
              <p className="Text Text--large Color--paragraph u-tSpace--l">
                <Trans
                  i18n={i18n}
                  i18nKey="team:desc"
                  components={[<span className="Color--emphasis">{config.name}</span>]}
                />
              </p>
            </div>

            {founderData && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                <MemberListItem
                  key={founderData.id}
                  data={founderData}
                  isLogged={isUserLogged}
                  i18n={i18n}
                  lang={lang}
                />
              </ul>
            )}

            {restMembers && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                {map(restMembers, member => (
                  <MemberListItem key={member.id} data={member} isLogged={isUserLogged} i18n={i18n} lang={lang} />
                ))}
              </ul>
            )}

            {isUserLogged && (
              <div style={{ display: 'flex', justifyContent: 'center', width: 'auto' }}>
                <Link page={'/admin/member'}>
                  <a className="Button Button--action">{i18n.t('team:add')}</a>
                </Link>
              </div>
            )}
          </div>
          <div className="Breadcrumb u-tSpace--xxl">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item u-rSpace--xl">
                <Trans
                  i18n={i18n}
                  i18nKey="team:join"
                  components={[
                    <span className="Color--emphasis">{config.name}</span>,
                    <ContactUs>{i18n.t('common:contact-us')}</ContactUs>
                  ]}
                />{' '}
              </li>
            </ul>
          </div>
        </div>

        <LastExperiences i18n={i18n} lang={lang} limit={6} />
      </Fragment>
    )
  }
}

Team.prototype.translateNS = ['team', 'experiences']

Team.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
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
)(Team)
