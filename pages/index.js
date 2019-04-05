import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { extend, map, slice, first, isEmpty } from 'lodash'
import Carousel from 'nuka-carousel'
import { Controller, Scene } from 'react-scrollmagic'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'

import Head from '../src/components/Head'
import LastExperiences from '../src/components/LastExperiences'
import StaticMap from '../src/components/Map/Static'
import HomeProposals from '../src/components/HomeProposals'
import HomeFeatures from '../src/components/HomeFeatures'
import Link from '../src/components/Link'
import { fetchMembers } from '../src/actions/TeamActions'
import { fetchExperiences } from '../src/actions/ExperienceActions'

import '../src/styles/home.scss'

class Index extends Component {
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
    const { i18n, members, features, experiences, children, proposals, lang } = this.props

    let experience = first(experiences)
    let entered = false
    const experienceFirstAuthorId = experience && first(experience.authors)

    return (
      <Fragment>
        <Head i18n={i18n} description={i18n.t('index:desc')} />
        {children}

        <div style={{ position: 'relative', backgroundColor: '#CCC' }}>
          <Carousel
            initialSlideHeight={640}
            heightMode={'first'}
            renderCenterLeftControls={({ previousSlide }) => (
              <button style={{ marginLeft: '10px' }} onClick={previousSlide}>
                <i className="fa fa-angle-left fa-4x Color--light" />
              </button>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <button style={{ marginRight: '10px' }} onClick={nextSlide}>
                <i className="fa fa-angle-right fa-4x Color--light" />
              </button>
            )}
          >
            {map([3, 2, 1, 4, 5], number => {
              return (
                <img
                  key={`homeImage-${number}`}
                  src={`/static/assets/images/home-${number}.jpg`}
                  alt={i18n.t('index:title')}
                  title={i18n.t('index:title')}
                />
              )
            })}
          </Carousel>

          <div className="Block-content js-more">
            <div className="Home-banner Paragraph Text Color--light Text--withShadow">
              <h2 className="Text--giant Text--strong">{i18n.t('index:subtitle')}</h2>
              <p className="Text--big u-tSpace--l">{i18n.t('index:desc')}</p>
              <Link page={'/proposals'}>
                <a className="Button Button--light u-tSpace--l" style={{ width: '100px' }}>
                  {i18n.t('index:more')}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="Block Block--spaced" id="proposals">
          <div className="Block-content Paragraph Paragraph--centered Text">
            <h4 className="Text--huge Text--strong Color--secondary">{i18n.t('index:proposals.title')}</h4>
            <p className="Text--large u-tSpace--l Color--paragraph">{i18n.t('index:proposals.desc')}</p>
          </div>
          <div className="Block-content">
            <HomeProposals i18n={i18n} proposals={proposals} />
          </div>
        </div>

        <div className="Block Block--spaced Bkg--lighter">
          <div className="Block-content">
            <div className="Proposals-featuresInfo Block-content Paragraph Paragraph--centered Text">
              <h4 className="Text--huge Text--strong Color--secondary">{i18n.t('index:features.title')}</h4>
              <p className="Text--large u-tSpace--l Color--paragraph">{i18n.t('index:features.desc')}</p>
            </div>
            <HomeFeatures i18n={i18n} features={features} />
          </div>
        </div>

        <div className="Block Block--spaced Home-members" id="js-members">
          <StaticMap />

          <div className="Block-content">
            <div className="Paragraph Paragraph--lefty Paragraph--superSpaced Text">
              <h4 className="Text--huge Text--strong Color--emphasis">{i18n.t('index:team.title')}</h4>
              <p className="Text--large u-tSpace--l Color--paragraph">{i18n.t('index:team.desc')}</p>
            </div>
          </div>

          <div>
            <Controller>
              <Scene duration={200} triggerElement="#js-members">
                {(progress, event) => {
                  const memberType = [
                    'Home-member--big',
                    'Home-member--small',
                    '',
                    'Home-member--big',
                    'Home-member--small'
                  ]

                  if (!entered) {
                    entered = event.state === 'DURING'
                  }

                  return (
                    <div className={`${entered ? 'is-visible' : ''}`}>
                      {map(slice(members, 0, 5), (member, index) => {
                        return (
                          <Link key={member.id} page={'/member'} params={{ memberId: member.id }}>
                            <a
                              className={`Home-member Home-member--pos${index} ${memberType[index]} js-tippy`}
                              data-theme="dark"
                              title={member.name}
                              data-tip={member.name}
                            >
                              <img src={member.avatarURL} title={member.name} alt={member.name} />
                            </a>
                          </Link>
                        )
                      })}
                      <ReactTooltip place={'top'} effect={'solid'} />
                    </div>
                  )
                }}
              </Scene>
            </Controller>
          </div>
        </div>

        {experience && (
          <div className="Block Bkg--others Experience-nextOne">
            <div className="Experience-nextOneContent">
              <div className="Block-content Paragraph--centered Text">
                <h4 className="Text--strong Text--giant Color--light">{i18n.t('index:experiences.title')}</h4>
                <p className="Text--large u-tSpace--l Color--light">{i18n.t('index:experiences.desc')}</p>
                <Link
                  page={'/experience'}
                  params={{
                    experienceSlug: experience.slug,
                    memberId: experienceFirstAuthorId
                  }}
                >
                  <a className="Button Button--light u-tSpace--l">
                    <FontAwesome name="globe" className="u-rSpace" /> {i18n.t('index:experiences.button')}
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}

        <LastExperiences limit={6} i18n={i18n} lang={lang} />
      </Fragment>
    )
  }
}

Index.prototype.translateNS = ['index', 'proposals', 'experiences']

function mapStateToProps(state, props) {
  return {
    members: isEmpty(state.members) ? props.members : state.members,
    proposals: state.proposals,
    features: state.features,
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
)(Index)
