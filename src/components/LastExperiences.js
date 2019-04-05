import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map, take, filter, isEmpty, first } from 'lodash'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import Link from './Link'
import Authors from './Authors'

import '../styles/experience.scss'

class LastExperiences extends Component {
  render() {
    const { experiences, user, members, limit = 10, i18n, lang } = this.props
    const isUserLogged = user.state === 'logged'
    const limitedExperiences = take(
      filter(experiences, experience => {
        if (!isUserLogged) {
          return !!experience.published
        } else {
          return true
        }
      }),
      limit
    )

    return (
      <div className="Banner Bkg--light">
        <Scrollbars style={{ height: '420px' }} className="Banner-wrapper js-itemsList">
          <ul className="Banner-list">
            {map(limitedExperiences, experience => {
              const { id, slug, published, title = {}, authors = [], shortDesc = {}, mainImageURL } = experience
              const experienceAuthors = filter(members, member => authors.includes(member.id))
              const experienceFirstAuthorId = first(experienceAuthors).id
              const experienceTitle = title[lang]
              const experienceDesc = shortDesc[lang]

              // If any of these properties is not defined...
              if (isEmpty(experienceAuthors)) {
                return null
              }

              return (
                <li key={id} className={`Banner-listItem ${!published ? 'is-hidden' : ''}`}>
                  <div className="Banner-info">
                    <Link page={'/experience'} params={{ memberId: experienceFirstAuthorId, experienceSlug: slug }}>
                      <a className="Banner-infoLink">
                        <img
                          src={mainImageURL}
                          className="Banner-infoImage"
                          alt={experienceTitle}
                          title={experienceTitle}
                        />
                        <span className="Banner-infoImageMamufas" />
                      </a>
                    </Link>
                    <div className="Banner-infoContent Text Text--withShadow Color--light">
                      <h3 className="Text--huge Text--strong">
                        <Link page={'/experience'} params={{ memberId: experienceFirstAuthorId, experienceSlug: slug }}>
                          <a className="Color--light">{experienceTitle}</a>
                        </Link>
                      </h3>

                      <Authors i18n={i18n} members={members} authors={authors} />
                      <p className="Text--large u-tSpace--l">{experienceDesc}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Scrollbars>
      </div>
    )
  }
}

LastExperiences.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  lang: PropTypes.string
}

function mapStateToProps(state) {
  return {
    user: state.user,
    members: state.members,
    experiences: state.experiences
  }
}

export default connect(mapStateToProps)(LastExperiences)
