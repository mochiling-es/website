import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { find, map, filter } from 'lodash'
import PropTypes from 'prop-types'

import { withNamespaces, Trans } from '../i18n'
import StaticMap from '../src/components/StaticMap'
import Head from '../src/components/Head'
import Link from '../src/components/Link'
import MemberListItem from '../src/components/MemberListItem'
import config from '../utils/config'
import LastExperiences from '../src/components/LastExperiences'

import '../src/styles/team.scss'

class Team extends Component {
  static async getInitialProps({ isServer }) {
    return {
      namespacesRequired: ['team'],
      isServer
    }
  }

  render() {
    const { t, members, children, user } = this.props
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
        <Link href="/contact">
          <a className="Color--linkSecondary">{t('contact-us')}</a>
        </Link>
      )
    }

    return (
      <Fragment>
        <Head title={t('title')} description={t('desc')} />

        <div className="Block">
          <StaticMap />
          {children} {/*Header*/}
          <div className="Block-content">
            <div className="Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--emphasis">{t('subtitle')}</h2>
              <p className="Text Text--large Color--paragraph u-tSpace--l">
                <Trans i18nKey="desc" components={[<span className="Color--emphasis">{config.name}</span>]} />
              </p>
            </div>

            {founderData && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                <MemberListItem key={founderData.id} data={founderData} />
              </ul>
            )}

            {restMembers && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                {map(restMembers, member => (
                  <MemberListItem key={member.id} data={member} />
                ))}
              </ul>
            )}
          </div>
          <div className="Breadcrumb u-tSpace--xxl">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item u-rSpace--xl">
                <Trans
                  i18nKey="join"
                  components={[
                    <span className="Color--emphasis">{config.name}</span>,
                    <ContactUs>{t('contact-us')}</ContactUs>
                  ]}
                />{' '}
              </li>
            </ul>
          </div>
        </div>

        <LastExperiences limit={6} />
      </Fragment>
    )
  }
}

Team.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    members: state.members
  }
}

export default connect(
  mapStateToProps,
  null
)(withNamespaces(['team'])(Team))
