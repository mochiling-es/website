import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { translate, Trans } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import FontAwesome from 'react-fontawesome'

import Head from '../src/components/Head'
import Link from '../src/components/Link'
import LastExperiences from '../src/components/LastExperiences'
import { wrapper } from '../src/components/i18n'
import config from '../utils/config'
import ExperiencesMap from '../src/components/Map/Experiences'

import '../src/styles/experiences.scss'

class Experiences extends Component {
  state = {
    mobile: false,
    context: 'page'
  }

  constructor(props) {
    super(props)

    this.state.mobile = isMobile
  }

  render() {
    const { children, experiences, user, t } = this.props
    const { mobile, context } = this.state
    const isUserLogged = user.state === 'logged'

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

        <div className="Experiences Block">
          <ExperiencesMap isUserLogged={isUserLogged} experiences={experiences} />
          {isUserLogged && (
            <div
              style={{ position: 'absolute', bottom: '90px', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
            >
              <Link as={`/experience/new`} href={`/admin/experience?memberId=&experienceSlug=`}>
                <a className="Button Button--action">{t('add')}</a>
              </Link>
            </div>
          )}
          {mobile && (
            <div className="Experiences-mapMobile">
              {context === 'map' && (
                <button
                  className="Experiences-mapMobileBack"
                  onClick={() => {
                    this.setState({ context: 'page' })
                  }}
                >
                  x
                </button>
              )}
              {context === 'page' && (
                <div className="Experiences-mapMobileDisclaimer">
                  <p className="Text Text--large">
                    <Trans i18nKey="navigate.map" components={[<FontAwesome name="hand-pointer-o">.</FontAwesome>]} />
                  </p>
                  <button
                    className="Button Button--action u-tSpace--m"
                    onClick={() => {
                      this.setState({ context: 'map' })
                    }}
                  >
                    {t('navigate.enable')}
                  </button>
                </div>
              )}
            </div>
          )}
          {children} {/*Header*/}
          {(context === 'page' || (mobile && context === 'page')) && (
            <div className="Block-content Paragraph Paragraph--centered u-tSpace--xxl js-title">
              <h2 className="Text Text--giant Text--strong Color--emphasis">{t('subtitle')}</h2>
              <p className="Text Text--large Color--paragraph u-tSpace--l">
                <Trans i18nKey="desc" components={[<span className="Color--emphasis">{config.name}</span>]} />
              </p>
            </div>
          )}
          <div className="Breadcrumb Experiences-breadcrumb u-tSpace--xxl">
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

Experiences.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    members: state.members,
    experiences: state.experiences
  }
}

export default wrapper(translate(['experiences'])(connect(mapStateToProps)(Experiences)))
