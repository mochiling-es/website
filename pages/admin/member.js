import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { find, isEmpty, extend } from 'lodash'

import Error from '../_error'
import { loadDB } from '../../lib/db'
import Link from '../../src/components/Link'
import Head from '../../src/components/Head'
import Form from '../../src/components/form/Form'
import genFields from './memberFields'
import { updateMember, createMember, deleteMember } from '../../src/actions/TeamActions'

class MemberEdit extends Component {
  state = {
    loading: false,
    error: null
  }

  static async getInitialProps({ isServer, query }) {
    const app = await loadDB()
    const firestore = app.firestore()
    const { memberId } = query

    const promiseMembers = new Promise(async (resolve, reject) => {
      await firestore
        .collection('members')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          let members = []
          snapshot.forEach(function(doc) {
            members.push(extend({ id: doc.id }, doc.data()))
          })
          resolve(members)
        })
    })

    const { members } = await Promise.all([promiseMembers]).then(function([members]) {
      return { members }
    })

    return {
      members,
      memberId
    }
  }

  componentWillMount = () => {
    const { i18n, lang } = this.props
    const commonData = require(`../../src/locales/common`).default

    if (this.translateNS) {
      this.translateNS.forEach(element => {
        const data = require(`../../src/locales/${element}`).default
        i18n.addResourceBundle(lang, element, data[lang])
      })
    }

    i18n.addResourceBundle(lang, 'common', commonData[lang])
    i18n.changeLanguage(lang)
  }

  onDelete = async () => {
    const { memberId, deleteMember, members, children, i18n, lang } = this.props
    let memberData = {}
    let error
    const onDone = ({ data, error }) => {
      return error
    }

    if (memberId) {
      memberData = find(members, ['id', memberId])

      if (!memberData) {
        return <Error status={404} children={children} i18n={i18n} lang={lang} />
      }
    }

    this.setState({ loading: true, error: null })

    const modalConfirmation = window.confirm(i18n.t('experiences:delete', { name: memberData.name }))
    if (modalConfirmation === true) {
      error = await deleteMember(memberId).then(onDone)
    }

    if (error) {
      this.setState({ loading: false, error })
    } else {
      window.location.href = '/team'
    }
  }

  onSubmit = async data => {
    const { memberId, updateMember, createMember } = this.props
    const onDone = ({ data, error }) => {
      return error
    }
    let error

    this.setState({ loading: true, error: null })

    if (memberId) {
      error = await updateMember(data).then(onDone)
    } else {
      error = await createMember(data).then(onDone)
      if (!error) {
        window.location.href = '/team'
      }
    }

    this.setState({ loading: false, error: (error && error.message) || null })
  }

  render() {
    const { memberId, user, members, i18n, children, lang } = this.props
    const { loading, error } = this.state
    let memberData = {}

    const fields = genFields({ i18n, members, memberId, lang })

    if (user.state !== 'logged') {
      return <Error status={403} children={children} i18n={i18n} lang={lang} />
    }

    if (memberId) {
      memberData = find(members, ['id', memberId])

      if (!memberData) {
        return <Error status={404} children={children} i18n={i18n} lang={lang} />
      }
    }

    return (
      <Fragment>
        <Head i18n={i18n} title={memberData.name} />

        <div className="Block" ref={node => (this.block = node)}>
          {children} {/*Header*/}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link page="/team">
                  <a className="Breadcrumb-link">{i18n.t('team:title')}</a>
                </Link>
              </li>
              {memberId && (
                <Fragment>
                  <li className="Breadcrumb-item Breadcrumb-item--separator">></li>
                  <li className="Breadcrumb-item">{memberData.name}</li>
                </Fragment>
              )}
            </ul>
          </div>
          <div className="Block-content">
            <Form
              i18n={i18n}
              onDelete={this.onDelete}
              onSubmit={this.onSubmit}
              fields={fields}
              formData={memberData}
              disabled={loading}
            />
            {error && <p className="Text Color--error u-tSpace--m">{error}</p>}
          </div>
        </div>
      </Fragment>
    )
  }
}

MemberEdit.prototype.translateNS = ['team', 'form']

MemberEdit.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  members: PropTypes.instanceOf(Array).isRequired,
  children: PropTypes.array.isRequired
}

function mapStateToProps(state, props) {
  return {
    members: isEmpty(state.members) ? props.members : state.members,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createMember: bindActionCreators(createMember, dispatch),
    updateMember: bindActionCreators(updateMember, dispatch),
    deleteMember: bindActionCreators(deleteMember, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEdit)
