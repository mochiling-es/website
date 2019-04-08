import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { Trans } from 'react-i18next'
import FontAwesome from 'react-fontawesome'

import config from '../utils/config'
import StaticMap from '../src/components/Map/Static'
import Link from '../src/components/Link'
import Head from '../src/components/Head'
import SocialBreadcrumb from '../src/components/SocialBreadcrumb'
import LastExperiences from '../src/components/LastExperiences'

import '../src/styles/proposals.scss'

class Proposals extends Component {
  static async getInitialProps({ query, isServer }) {
    const { proposalId = '1' } = query

    return {
      proposalId,
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
    const { i18n, children, proposals, features, proposalId, lang } = this.props
    const currentProposal = proposals[proposalId - 1]

    return (
      <Fragment>
        <Head i18n={i18n} title={i18n.t('proposals:title')} description={i18n.t('proposals:desc')} />

        <div className="Block">
          <div className="Proposals-header">
            {children} {/*Header*/}
            <div className="Block-content Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--light">{i18n.t('proposals:subtitle')}</h2>
              <p className="Text Text--large Color--lightParagraph u-tSpace--l">{i18n.t('proposals:desc')}</p>
            </div>
            <nav className="Proposals-nav">
              <ul className="Block-content Proposals-navList">
                {map(proposals, (proposal, index) => {
                  const proposalIndex = index + 1

                  return (
                    <li
                      key={index}
                      className={`Proposals-navItem ${proposalIndex === parseInt(proposalId) ? 'is-selected' : ''}`}
                    >
                      <Link page={'/proposals'} params={{ proposalId: proposalIndex }}>
                        <a className="Proposals-navItemButton">
                          <span className="Text Text--strong Text--medLarge Text--uppercase">
                            {i18n.t(`proposals:items.${proposalIndex}.title`)}
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
                      i18n={i18n}
                      i18nKey={`proposals:items.${proposalId}.desc`}
                      components={[<span className="Color--emphasis">.</span>]}
                    />{' '}
                  </p>
                  <a
                    className="Button Button--main u-tSpace--l"
                    style={{ width: '150px' }}
                    href={`mailto:${config.email}`}
                  >
                    {i18n.t('common:contact-us')}
                  </a>
                </div>
              </div>
            </div>

            <div className=" Block-content">
              <div className="Proposals-featuresInfo Block-content Paragraph Paragraph--centered u-tSpace--xxl">
                <h4 className="Text--large Text--strong Text--uppercase Color--secondary">
                  {i18n.t('proposals:features.title')}
                </h4>
              </div>

              <ul className="Proposals-featuresList u-bSpace--xxl pure-g">
                {map(features, feature => {
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
                            {i18n.t(`proposals:features.${feature.name}.title`)}
                          </h5>
                          <p className="Proposals-featureItemDesc Text Text--medLarge u-tSpace--m Color">
                            {i18n.t(`proposals:features.${feature.name}.desc`)}
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
                <Trans
                  i18n={i18n}
                  i18nKey="proposals:disclaimer"
                  components={[<span className="Color--emphasis">{config.name}</span>]}
                />{' '}
                <a className="Color--link" href="{% tl experiences %}">
                  {i18n.t('proposals:experiences')}
                </a>
                .
              </p>
            </div>
          </div>

          <SocialBreadcrumb i18n={i18n} />
        </div>

        <LastExperiences i18n={i18n} limit={6} lang={lang} />
      </Fragment>
    )
  }
}

Proposals.prototype.translateNS = ['proposals', 'experiences']

Proposals.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  proposals: PropTypes.instanceOf(Array).isRequired,
  features: PropTypes.instanceOf(Array).isRequired
}

function mapStateToProps(state) {
  return {
    proposals: state.proposals,
    features: state.features
  }
}

export default connect(mapStateToProps)(Proposals)
