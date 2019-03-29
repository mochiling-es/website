import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { translate } from 'react-i18next'
import { map, sampleSize, first } from 'lodash'
import ReactSwipe from 'react-swipe'
import { Controller, Scene } from 'react-scrollmagic'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'

import Head from '../src/components/Head'
import LastExperiences from '../src/components/LastExperiences'
import StaticMap from '../src/components/Map/Static'
import HomeProposals from '../src/components/HomeProposals'
import HomeFeatures from '../src/components/HomeFeatures'
import Link from '../src/components/Link'
import { wrapper } from '../src/components/i18n'
import { fetchMembers } from '../src/actions/TeamActions'
import { fetchExperiences } from '../src/actions/ExperienceActions'

import '../src/styles/home.scss'

class Index extends Component {
  render() {
    const { t, members, features, experiences, children, proposals } = this.props
    const experience = first(experiences)
    const membersSample = sampleSize(members, 5)
    let entered = false

    const experienceFirstAuthorId = first(experience.authors)
    const experienceAs = `/experiences/${experienceFirstAuthorId}/${experience.slug}`
    const experienceHref = `/experience?memberId=${experienceFirstAuthorId}&experienceSlug=${experience.slug}`

    let reactSwipeEl
    const swiperOptions = {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }

    return (
      <Fragment>
        <Head title={t('title')} description={t('desc')} />
        {children}

        <div className="Block Home-presentation">
          <ReactSwipe
            className="swiper-container Home-slider"
            swipeOptions={swiperOptions}
            ref={el => (reactSwipeEl = el)}
          >
            <div className="swiper-wrapper">
              {map([3, 2, 1, 4, 5], number => {
                return (
                  <div className="swiper-slide" key={number}>
                    <img
                      key={`homeImage-${number}`}
                      src={`/static/assets/images/home-${number}.jpg`}
                      alt={t('title')}
                      title={t('title')}
                    />
                  </div>
                )
              })}
            </div>
          </ReactSwipe>

          {/* <div className="Home-sliderMamufas" />
          <div className="swiper-pagination" />
          <button className="swiper-button-prev" onClick={() => reactSwipeEl.prev()}>
            <i className="fa fa-angle-left fa-4x Color--light" />
          </button>
          <button className="swiper-button-next" onClick={() => reactSwipeEl.next()}>
            <i className="fa fa-angle-right fa-4x Color--light" />
          </button> */}
          {/* 
          <div>
            <div className="Block-content js-more">
              <div className="Home-banner Paragraph Text Color--light Text--withShadow">
                <h2 className="Text--giant Text--strong">{t('subtitle')}</h2>
                <p className="Text--big u-tSpace--l">{t('desc')}</p>
                <a href="#proposals" className="Button Button--light u-tSpace--l">
                  {t('more')}
                </a>
              </div>
            </div>
          </div> */}
        </div>

        <div className="Block Block--spaced" id="proposals">
          <div className="Block-content Paragraph Paragraph--centered Text">
            <h4 className="Text--huge Text--strong Color--secondary">{t('proposals.title')}</h4>
            <p className="Text--large u-tSpace--l Color--paragraph">{t('proposals.desc')}</p>
          </div>
          <div className="Block-content">
            <HomeProposals proposals={proposals} />
          </div>
        </div>

        <div className="Block Block--spaced Bkg--lighter">
          <div className="Block-content">
            <div className="Proposals-featuresInfo Block-content Paragraph Paragraph--centered Text">
              <h4 className="Text--huge Text--strong Color--secondary">{t('features.title')}</h4>
              <p className="Text--large u-tSpace--l Color--paragraph">{t('features.desc')}</p>
            </div>
            <HomeFeatures features={features} />
          </div>
        </div>

        <div className="Block Block--spaced Home-members" id="js-members">
          <StaticMap />

          <div className="Block-content">
            <div className="Paragraph Paragraph--lefty Paragraph--superSpaced Text">
              <h4 className="Text--huge Text--strong Color--emphasis">{t('team.title')}</h4>
              <p className="Text--large u-tSpace--l Color--paragraph">{t('team.desc')}</p>
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
                      {map(membersSample, (member, index) => {
                        return (
                          <Link key={member.id} as={`/team/${member.id}`} href={`/member?memberId=${member.id}`}>
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

        <div className="Block Bkg--others Experience-nextOne">
          <div className="Experience-nextOneContent">
            <div className="Block-content Paragraph--centered Text">
              <h4 className="Text--strong Text--giant Color--light">{t('experiences.title')}</h4>
              <p className="Text--large u-tSpace--l Color--light">{t('experiences.desc')}</p>
              <Link as={experienceAs} href={experienceHref}>
                <a className="Button Button--light u-tSpace--l">
                  <FontAwesome name="globe" className="u-rSpace" /> {t('experiences.title')}
                </a>
              </Link>
            </div>
          </div>
        </div>

        <LastExperiences limit={6} />
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    members: state.members,
    proposals: state.proposals,
    features: state.features,
    experiences: state.experiences
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch),
    fetchExperiences: bindActionCreators(fetchExperiences, dispatch)
  }
}

export default wrapper(
  translate(['index'])(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Index)
  )
)
