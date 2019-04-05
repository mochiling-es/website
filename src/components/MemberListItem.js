import React, { Component, Fragment } from 'react'
import { map } from 'lodash'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'

import Link from '../components/Link'

const socialTypes = ['facebook', 'instagram', 'twitter']

class MemberListItem extends Component {
  state = {
    loading: false,
    error: null
  }

  render() {
    const { data, lang, isLogged, i18n } = this.props
    const { error, loading } = this.state

    return (
      <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-4">
        <div className="l-box">
          <div className={`Members-item ${!data.published ? 'is-hidden' : ''}`}>
            {isLogged && (
              <div className="Members-itemActions">
                {loading && <FontAwesome name="circle-o-notch" className="Color--paragraph" spin />}
                {!loading && (
                  <Fragment>
                    {error && (
                      <div data-tip={error}>
                        <FontAwesome className="Color--error" name="warning" />
                        <ReactTooltip type="error" effect="solid" />
                      </div>
                    )}

                    <Link page={'/admin/member'} params={{ memberId: data.id }}>
                      <a>
                        <FontAwesome name="pencil" className="Color--action" />
                      </a>
                    </Link>
                  </Fragment>
                )}
              </div>
            )}

            <div className="Members-itemImage">
              <Link page={`/member`} params={{ memberId: data.id }}>
                <a>
                  <img className="pure-img" src={data.avatarURL} title={data.name} alt={data.name} />
                </a>
              </Link>
            </div>
            <div className="Members-itemInfo">
              <h4 className="Members-itemTitle Text">
                <Link page={`/member`} params={{ memberId: data.id }}>
                  <a className="Color--link">{data.name}</a>
                </Link>
              </h4>
              <p className="Members-itemRole Text Text--paragraph">
                {(data.role && i18n.t(`team:role.${data.role}`)) || ''}
              </p>
              <p className="Text Text--paragraph Members-itemDesc Color--dark u-tSpace--m">
                {data.shortDesc && `${data.shortDesc[lang]}.`}
              </p>
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

export default MemberListItem
