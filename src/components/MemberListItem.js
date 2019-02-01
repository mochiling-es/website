import React, { Component } from 'react'
import { map } from 'lodash'
import FontAwesome from 'react-fontawesome'

import { i18n, withNamespaces } from '../../i18n'

const socialTypes = ['facebook', 'instagram', 'twitter']

class MemberListItem extends Component {
  render() {
    const { data, t } = this.props
    const lang = i18n.language

    return (
      <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-4">
        <div className="l-box">
          <div className="Members-item">
            <div className="Members-itemImage">
              <a href="---">
                <img className="pure-img" src={data.avatarURL} title={data.name} alt={data.name} />
              </a>
            </div>
            <div className="Members-itemInfo">
              <h4 className="Members-itemTitle Text">
                <a href="---" className="Color--link">
                  {data.name}
                </a>
              </h4>
              <p className="Members-itemRole Text Text--paragraph">{t(`roles.${data.role}`)}</p>
              <p className="Text Text--paragraph Members-itemDesc Color--dark u-tSpace--m">{data.desc[lang]}.</p>
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

export default withNamespaces('team')(MemberListItem)
