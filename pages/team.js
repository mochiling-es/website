import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { find, map, filter } from 'lodash'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { withNamespaces, Trans } from '../i18n'
import StaticMap from '../src/components/StaticMap'
import Head from '../src/components/Head'
import MemberListItem from '../src/components/MemberListItem'
import { fetchMembers } from '../src/actions/TeamActions'
import config from '../utils/config'

import '../src/styles/members.scss'

class Team extends Component {
  static async getInitialProps({ store, isServer }) {
    store.dispatch(fetchMembers())

    return {
      namespacesRequired: ['team'],
      isServer
    }
  }

  componentDidMount() {
    this.props.fetchMembers()
  }

  render() {
    const { t, members } = this.props
    const founderData = find(members, ['role', 'founder'])
    const restMembers = filter(members, m => {
      return m.role !== 'founder'
    })

    return (
      <Fragment>
        <Head title={t('title')} />

        <div style={{}}>
          <StaticMap />
          <div className="Block-content">
            <div className="Paragraph Paragraph--centered u-tSpace--xxl">
              <h2 className="Text Text--giant Text--strong Color--emphasis">{t('subtitle')}</h2>
              <p className="Text Text--large Color--paragraph u-tSpace--l">
                <Trans i18nKey="desc" components={[<span className="Color--emphasis">{config.name}</span>]} />
              </p>
            </div>

            {founderData && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                <MemberListItem key={founderData.id} data={founderData} />
              </ul>
            )}

            {restMembers && (
              <ul className="Members-list Members-list--centered u-tSpace--xxl pure-g">
                {map(restMembers, member => (
                  <MemberListItem key={member.id} data={member} />
                ))}
              </ul>
            )}
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

function mapStateToProps(state) {
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
