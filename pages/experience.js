import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { find, size, map } from 'lodash'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import Masonry from 'react-masonry-component'

import Error from './_error'
import Link from '../src/components/Link'
import Head from '../src/components/Head'
import { wrapper, i18nHelper } from '../src/components/i18n'
import NextExperience from '../src/components/NextExperience'

import '../src/styles/experience.scss'

class Experience extends Component {
  static async getInitialProps({ store, query, isServer }) {
    const { experienceSlug, memberId } = query

    return {
      memberId,
      experienceSlug,
      isServer
    }
  }

  render() {
    const { memberId, user, members, experiences, experienceSlug, t, children } = this.props
    let experienceData = {}
    let nextExperience
    let experiencePosition
    const lang = i18nHelper.getCurrentLanguage()

    if (experienceSlug && memberId) {
      experienceData = find(experiences, (experience, pos) => {
        if (experience.slug === experienceSlug && experience.authors.includes(memberId)) {
          experiencePosition = pos
          return true
        } else {
          return false
        }
      })

      if (!experienceData) {
        return <Error status={404} />
      }
    } else {
      return <Error status={404} />
    }

    const title = (experienceData.title && experienceData.title[lang]) || ''
    const subtitle = (experienceData.title && experienceData.subtitle[lang]) || ''
    const shortDesc = (experienceData.title && experienceData.shortDesc[lang]) || ''
    const longDesc = (experienceData.title && experienceData.longDesc[lang]) || ''
    const instagramTag = experienceData.instagramTag
    const imagesListURL = experienceData.imagesListURL

    if (size(experiences) > 1) {
      let nextExperiencePos = experiencePosition + 1
      if (nextExperiencePos >= size(experiences)) {
        nextExperiencePos = 0
      }

      nextExperience = experiences[nextExperiencePos]
    }

    return (
      <Fragment>
        <Head title={title} description={shortDesc} image={experienceData.mainImageURL} />

        <div className="Block" ref={node => (this.block = node)}>
          {children} {/*Header*/}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link href="/experiences">
                  <a className="Breadcrumb-link">{t('title')}</a>
                </Link>
              </li>
              <li className="Breadcrumb-item Breadcrumb-item--separator">></li>
              <li className="Breadcrumb-item">{title}</li>
            </ul>
          </div>

          <div class="Experience-wrapper">
          <div class="Experience-image">
            <img src="{{ experience.image }}" class="Experience-imageItem" alt="{% t experiences.title %}" title="{% t experiences.title %}"/>
          </div>

          <div class="Experience-content Text--withShadow Block-content">
            <div class="Experience-contentInfo">
              <h4 class="Color--light Text Text--uppercase Text--med">{subtitle}</h4>
              <h2 class="Color--light Text Text--giant Text--strong">{ title }</h2>
              <div class="Text Color--light Experience-author">
                {'author'}
                <a href="{% tl {{ experience.author }} %}" class="Experience-authorLink Text--med Color--light">
                  <img class="Experience-authorImage u-rSpace" src="/img/members/{{ experience_author.image }}" title="{{ experience_author.complete_name }}" alt="{{ experience_author.complete_name }}" />
                  {{ experience_author.complete_name }}
                </a>
              </div>

              <div class="Experience-text u-tSpace--xl">
                <p className="Text Text--large Color--light Paragraph">{longDesc}</p>
              </div>

              <div class="Experience-social Color--light u-tSpace--m">
                <ul class="Experience-socialList">
                  {youtubeURL && (<li class="u-rSpace--xl">
                      <button class="js-playVideo">
                        <i class="fa fa-youtube-play fa-2x"></i>
                      </button>
                    </li>)}
                </ul>
              </div>
            </div>

            {% include experiences-countries.html experience=page.namespace %}
          </div>


          {instagramTag && (
            <div className="Breadcrumb">
              <ul className="Breadcrumb-inner">
                <li className="Breadcrumb-item u-rSpace--xl">Instagram</li>
                <li className="Breadcrumb-item u-rSpace--xl">
                  <a
                    href={`https://www.instagram.com/explore/tags/${experienceData.instagramTag}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="Breadcrumb-link"
                  >
                    <span className="Breakcrumb-linkDesc u-lSpace">#{instagramTag}</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
          {imagesListURL && (
            <div className="Experience-photos">
              <Masonry
                className={'grid'}
                elementType={'ul'}
                options={{
                  transitionDuration: 0,
                  columnWidth: 100,
                  gutter: 10
                }}
                disableImagesLoaded={true}
                updateOnEachImageLoad={false}
              >
                {map(imagesListURL, image => {
                  return (
                    <li key={image} className="cell">
                      <img src={image} alt={''} title={''} />
                    </li>
                  )
                })}
              </Masonry>
            </div>
          )}
        </div>

        {nextExperience && <NextExperience experienceData={nextExperience} />}
      </Fragment>
    )
  }
}

Experience.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    members: state.members,
    experiences: state.experiences,
    user: state.user
  }
}

export default wrapper(translate(['experiences'])(connect(mapStateToProps)(Experience)))
