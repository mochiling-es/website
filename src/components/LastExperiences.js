import React, { Component } from 'react'
import { connect } from 'react-redux'
import { map, take, find, filter } from 'lodash'
import PropTypes from 'prop-types'

import { i18n } from '../../i18n'
import Link from './Link'

import '../styles/experience.scss'

class LastExperiences extends Component {
  render() {
    const { experiences, user, members, limit = 10 } = this.props
    const lang = i18n.language
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
        <div className="Banner-wrapper js-itemsList">
          <ul className="Banner-list">
            {map(limitedExperiences, experience => {
              const { id, published, title = {}, authors = [], shortDesc = {}, mainImageURL } = experience
              const memberData = find(members, member => member.id === authors[0])
              const experienceLink = memberData && `/experiences/${memberData.id}/${id}`
              const experienceTitle = title[lang]
              const experienceDesc = shortDesc[lang]

              // If any of these properties is not defined...
              if (!memberData) {
                return null
              }

              return (
                <li key={id} className={`Banner-listItem ${!published ? 'is-hidden' : ''}`}>
                  <div className="Banner-info">
                    <Link as={experienceLink} href={`/experience?experienceId=${id}`}>
                      <a>
                        <img
                          src={mainImageURL}
                          className="Banner-infoImage"
                          alt={experienceTitle}
                          title={experienceTitle}
                        />
                      </a>
                    </Link>
                    <div className="Banner-infoContent Text Text--withShadow Color--light">
                      <h3 className="Text--huge Text--strong">
                        <Link as={experienceLink} href={`/experience?experienceId=${id}`}>
                          <a className="Color--light">{experienceTitle}</a>
                        </Link>
                      </h3>
                      <div className="Text Text--med Experience-author">
                        <Link as={`/team/${memberData.id}`} href={`/member?memberId=${memberData.id}`}>
                          <a className="Experience-authorLink">
                            <img
                              className="Experience-authorImage u-rSpace"
                              src={memberData.avatarURL}
                              title={memberData.name}
                              alt={memberData.name}
                            />
                            {memberData.name}
                          </a>
                        </Link>
                      </div>
                      <p className="Text--large u-tSpace--l">{experienceDesc}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

LastExperiences.propTypes = {
  members: PropTypes.instanceOf(Array).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user,
    members: state.members,
    experiences: state.experiences
  }
}

export default connect(
  mapStateToProps,
  null
)(LastExperiences)
