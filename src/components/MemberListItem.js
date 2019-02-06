import React, { Component, Fragment } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import FontAwesome from 'react-fontawesome'
import ReactTooltip from 'react-tooltip'

import Link from '../components/Link'
import { deleteMember } from '../actions/TeamActions'
import { i18n, withNamespaces } from '../../i18n'

const socialTypes = ['facebook', 'instagram', 'twitter']

class MemberListItem extends Component {
  state = {
    loading: false,
    error: null
  }

  onDelete = async () => {
    const { t, data, deleteMember } = this.props
    const { id, name } = data
    let error
    const onDone = ({ data, error }) => {
      return error
    }

    this.setState({ loading: true, error: null })

    const modalConfirmation = window.confirm(t('delete', { name }))
    if (modalConfirmation === true) {
      error = await deleteMember(id).then(onDone)
    }

    if (error) {
      this.setState({ loading: false, error })
    }
  }

  render() {
    const { data, user, t } = this.props
    const { error, loading } = this.state
    const userLogged = user.state === 'logged'
    const lang = i18n.language

    return (
      <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-4">
        <div className="l-box">
          <div className={`Members-item ${!data.published ? 'is-hidden' : ''}`}>
            {userLogged && (
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

                    <Link as={`/team/${data.id}/edit`} href={`/admin/member?memberId=${data.id}`}>
                      <a>
                        <FontAwesome name="pencil" className="Color--action" />
                      </a>
                    </Link>
                    <button onClick={this.onDelete}>
                      <FontAwesome name="times" className="Color--error" />
                    </button>
                  </Fragment>
                )}
              </div>
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
              <p className="Members-itemRole Text Text--paragraph">{(data.role && t(`role.${data.role}`)) || ''}</p>
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

const mapDispatchToProps = dispatch => {
  return {
    deleteMember: bindActionCreators(deleteMember, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    members: state.members,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces('team')(MemberListItem))
