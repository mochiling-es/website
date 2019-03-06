import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { translate, Trans } from 'react-i18next'
import FontAwesome from 'react-fontawesome'

import config from '../utils/config'
import { wrapper } from '../src/components/i18n'
import StaticMap from '../src/components/Map/Static'
import Link from '../src/components/Link'
import Head from '../src/components/Head'
import SocialBreadcrumb from '../src/components/SocialBreadcrumb'
import LastExperiences from '../src/components/LastExperiences'

import '../src/styles/proposals.scss'

const proposalFeatures = [
  {
    name: 'experience',
    icon: 'globe',
    color: 'Proposals-featureColor--experience'
  },
  {
    name: 'contact',
    icon: 'info',
    color: 'Proposals-featureColor--skype'
  },
  {
    name: 'expert',
    icon: 'id-badge',
    color: 'Proposals-featureColor--expert'
  },
  {
    name: 'face-2-face',
    icon: 'map-o',
    color: 'Proposals-featureColor--face2face'
  },
  {
    name: 'customer',
    icon: 'phone',
    color: 'Proposals-featureColor--customer'
  },
  {
    name: 'insurance',
    icon: 'life-saver',
    color: 'Proposals-featureColor--insurance'
  }
]

class Proposals extends Component {
  static async getInitialProps({ query, isServer }) {
    const { proposalId = '1' } = query

    return {
      proposalId,
      isServer
    }
  }

  render() {
    const { t, children, proposals, proposalId } = this.props
    const currentProposal = proposals[proposalId - 1]

    return (
      <Fragment>
        <Head title={t('title')} description={t('desc')} />

        <div className="Block">
          <div className="Proposals-header">
            {children} {/*Header*/}
            <div className="Block-content Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--light">{t('subtitle')}</h2>
              <p className="Text Text--large Color--lightParagraph u-tSpace--l">{t('desc')}</p>
            </div>
            <nav className="Proposals-nav">
              <ul className="Block-content Proposals-navList">
                {map(proposals, (proposal, index) => {
                  const proposalIndex = index + 1

                  return (
                    <li className={`Proposals-navItem ${proposalIndex === parseInt(proposalId) ? 'is-selected' : ''}`}>
                      <Link as={`/proposals/${proposalIndex}`} href={`/proposals?proposalId=${proposalIndex}`}>
                        <a className="Proposals-navItemButton">
                          <span className="Text Text--strong Text--medLarge Text--uppercase">
                            {t(`items.${proposalIndex}.title`)}
                          </span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="Proposals-features">
            <StaticMap />

            <div className="Proposals-item">
              <div className="Proposals-itemInfo Block-content">
                <div className="Proposals-itemDesc">
                  <p className="Text Text--wayBig Text--uppercase Color--secondary js-itemDesc">
                    <Trans
                      i18nKey={`items.${proposalId}.desc`}
                      components={[<span className="Color--emphasis">.</span>]}
                    />{' '}
                  </p>
                  <a
                    className="Button Button--main u-tSpace--l"
                    style={{ width: '150px' }}
                    href={`mailto:${config.email}`}
                  >
                    {t('contact-us')}
                  </a>
                </div>
              </div>
            </div>

            <div className=" Block-content">
              <div className="Proposals-featuresInfo Block-content Paragraph Paragraph--centered u-tSpace--xxl">
                <h4 className="Text--large Text--strong Text--uppercase Color--secondary">{t('features.title')}</h4>
              </div>

              <ul className="Proposals-featuresList u-bSpace--xxl pure-g">
                {map(proposalFeatures, feature => {
                  return (
                    <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3">
                      <div className="l-box">
                        <div
                          className={`Proposals-featureItem ${
                            currentProposal.features.includes(feature.name) ? '' : 'is-disabled'
                          }`}
                        >
                          <div className={`${feature.color} Proposals-featureItemIcon`}>
                            <FontAwesome name={feature.icon} />
                          </div>
                          <h5
                            className={`${
                              feature.color
                            } Proposals-featureItemTitle Text Text--medLarge Text--strong Text--uppercase u-tSpace--m`}
                          >
                            {t(`features.${feature.name}.title`)}
                          </h5>
                          <p className="Proposals-featureItemDesc Text Text--medLarge u-tSpace--m Color">
                            {t(`features.${feature.name}.desc`)}
                          </p>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="Block-content Paragraph Paragraph--centered u-tSpace--xxxl">
              <p className="Text Text--medLarge Color--paragraph u-tSpace--l">
                <Trans i18nKey="disclaimer" components={[<span className="Color--emphasis">{config.name}</span>]} />{' '}
                <a className="Color--link" href="{% tl experiences %}">
                  {t('experiences')}
                </a>
                .
              </p>
            </div>
          </div>

          <SocialBreadcrumb />
        </div>

        <LastExperiences limit={6} />
      </Fragment>
    )
  }
}

Proposals.propTypes = {
  t: PropTypes.func.isRequired,
  proposals: PropTypes.instanceOf(Array).isRequired
}

function mapStateToProps(state) {
  return {
    proposals: state.proposals
  }
}

export default wrapper(translate(['proposals'])(connect(mapStateToProps)(Proposals)))
