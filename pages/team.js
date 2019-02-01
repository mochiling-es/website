import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { i18n, withNamespaces, Trans } from '../i18n'
import StaticMap from '../src/components/StaticMap'
import Head from '../src/components/Head'
import { fetchMembers } from '../src/actions/TeamActions'
import config from '../utils/config'

import '../src/styles/members.scss'

class Team extends Component {
  static async getInitialProps ({ store, isServer }) {
    store.dispatch(fetchMembers())

    return { isServer }
  }

  componentDidMount () {
    this.props.fetchMembers()
  }

  render () {
    const { t, members } = this.props
    console.log(members)
    const lang = i18n.language

    return (
      <Fragment>
        <Head title={t('title')} />

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <StaticMap />
          <div className='Block-content'>
            <div className='Paragraph Paragraph--centered u-tSpace--xxl'>
              <h2 className='Text Text--giant Text--strong Color--emphasis'>{t('subtitle')}</h2>
              <p className='Text Text--large Color--paragraph u-tSpace--l'>
                <Trans i18nKey='desc' components={[<span className='Color--emphasis'>{config.name}</span>]} />
              </p>
            </div>

            <ul className='Members-list Members-list--centered u-tSpace--xxl pure-g'>
              {members.map(member => (
                <li key={member.id} className='pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-4'>
                  <div className='l-box'>
                    <div className='Members-item'>
                      <div className='Members-itemImage'>
                        <a href='---'>
                          <img className='pure-img' src={member.avatarURL} title={member.name} alt={member.name} />
                        </a>
                      </div>
                      <div className='Members-itemInfo'>
                        <h4 className='Members-itemTitle Text'>
                          <a href='---' className='Color--link'>
                            {member.name}
                          </a>
                        </h4>
                        <p className='Members-itemRole Text Text--paragraph'>{t(`roles.${member.role}`)}</p>
                        <p className='Text Text--paragraph Members-itemDesc Color--dark u-tSpace--m'>
                          {member.desc[lang]}.
                        </p>
                      </div>
                      <nav className='Members-itemFooter'>
                        {member.facebookId && (
                          <a
                            href={`http://facebook.com/${member.facebookId}`}
                            className='Color--paragraph Members-itemSocial Members-itemSocial--facebook'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className=' fa fa-facebook' />
                          </a>
                        )}

                        {member.instagramId && (
                          <a
                            href={`http://instagr.am/${member.instagramId}`}
                            className='Color--paragraph Members-itemSocial Members-itemSocial--instagram'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className=' fa fa-instagram' />
                          </a>
                        )}

                        {member.instagramId && (
                          <a
                            href={`http://twitter.com/${member.twitterId}`}
                            className='Color--paragraph Members-itemSocial Members-itemSocial--twitter'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <i className=' fa fa-twitter' />
                          </a>
                        )}
                      </nav>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}

Team.propTypes = {
  t: PropTypes.func.isRequired,
  members: PropTypes.instanceOf(Array).isRequired
}

function mapStateToProps (state) {
  return {
    members: state.members
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMembers: bindActionCreators(fetchMembers, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces('team')(Team))
