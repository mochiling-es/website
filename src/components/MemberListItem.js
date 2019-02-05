import React, { Component } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import Link from '../components/Link'
import FontAwesome from 'react-fontawesome'

import { i18n, withNamespaces } from '../../i18n'

const socialTypes = ['facebook', 'instagram', 'twitter']

class MemberListItem extends Component {
  render() {
    const { data, user, t } = this.props
    const userLogged = user.state === 'logged'
    const lang = i18n.language

    return (
      <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-4">
        <div className="l-box">
          <div className="Members-item">
            {userLogged && (
              <Link as={`/team/${data.id}/edit`} href={`/admin/member?memberId=${data.id}`}>
                <a className="Members-itemEdit">
                  <FontAwesome name="pencil" className="Color--action" />
                </a>
              </Link>
            )}

            <div className="Members-itemImage">
              <Link as={`/team/${data.id}`} href={`/member?memberId=${data.id}`}>
                <a>
                  <img className="pure-img" src={data.avatarURL} title={data.name} alt={data.name} />
                </a>
              </Link>
            </div>
            <div className="Members-itemInfo">
              <h4 className="Members-itemTitle Text">
                <Link as={`/team/${data.id}`} href={`/member?memberId=${data.id}`}>
                  <a className="Color--link">{data.name}</a>
                </Link>
              </h4>
              <p className="Members-itemRole Text Text--paragraph">{t(`roles.${data.role}`)}</p>
              <p className="Text Text--paragraph Members-itemDesc Color--dark u-tSpace--m">{data.shortDesc[lang]}.</p>
            </div>
            <nav className="Members-itemFooter">
              {map(socialTypes, socialName => {
                if (data[`${socialName}Id`]) {
                  return (
                    <a
                      key={`${data.id}-${socialName}`}
                      href={`http://${socialName}.com/${data[`${socialName}Id`]}`}
                      className={`Color--paragraph Members-itemSocial Members-itemSocial--${socialName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FontAwesome name={socialName} />
                    </a>
                  )
                } else {
                  return null
                }
              })}
            </nav>
          </div>
        </div>
      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(withNamespaces('team')(MemberListItem))
