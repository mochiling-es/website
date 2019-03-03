import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { find } from 'lodash'
import { translate } from 'react-i18next'

import Error from '../_error'
import Link from '../../src/components/Link'
import Head from '../../src/components/Head'
import Form from '../../src/components/form/Form'
import genFields from './memberFields'
import { updateMember, createMember, deleteMember } from '../../src/actions/TeamActions'
import { wrapper } from '../../src/components/i18n'

class MemberEdit extends Component {
  state = {
    loading: false,
    error: null
  }

  static async getInitialProps({ store, query, isServer }) {
    const { memberId } = query

    return {
      memberId,
      isServer
    }
  }

  onDelete = async () => {
    const { t, memberId, deleteMember, members } = this.props
    let memberData = {}
    let error
    const onDone = ({ data, error }) => {
      return error
    }

    if (memberId) {
      memberData = find(members, ['id', memberId])

      if (!memberData) {
        return <Error status={404} />
      }
    }

    this.setState({ loading: true, error: null })

    const modalConfirmation = window.confirm(t('delete', { name: memberData.name }))
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
    const { memberId, user, members, t, children } = this.props
    const { loading, error } = this.state
    let memberData = {}

    const fields = genFields({ t, members, memberId })

    if (user.state !== 'logged') {
      return <Error status={403} />
    }

    if (memberId) {
      memberData = find(members, ['id', memberId])

      if (!memberData) {
        return <Error status={404} />
      }
    }

    return (
      <Fragment>
        <Head title={memberData.name} />

        <div className="Block" ref={node => (this.block = node)}>
          {children} {/*Header*/}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link href="/team">
                  <a className="Breadcrumb-link">{t('title')}</a>
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

function mapStateToProps(state) {
  return {
    members: state.members,
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

export default wrapper(
  translate(['team'])(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(MemberEdit)
  )
)
