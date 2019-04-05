import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { find, mapValues, size, isEmpty, extend } from 'lodash'

import Error from '../_error'
import { loadDB } from '../../lib/db'
import Link from '../../src/components/Link'
import Head from '../../src/components/Head'
import Form from '../../src/components/form/Form'
import genFields from './experienceFields'
import { updateExperience, createExperience, deleteExperience } from '../../src/actions/ExperienceActions'

class ExperienceEdit extends Component {
  state = {
    loading: false,
    error: null
  }

  static async getInitialProps({ isServer, query }) {
    const app = await loadDB()
    const firestore = app.firestore()
    const { experienceSlug, memberId } = query

    const promise = new Promise(async (resolve, reject) => {
      await firestore
        .collection('experiences')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          let members = []
          snapshot.forEach(function(doc) {
            members.push(extend({ id: doc.id }, doc.data()))
          })
          resolve(members)
        })
    })

    const { experiences } = await Promise.all([promise]).then(function([experiences]) {
      return { experiences }
    })

    return {
      experiences,
      memberId,
      experienceSlug,
      isServer
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

  filterData = data => {
    return mapValues(data, (value, key) => {
      if (key === 'startDate' || key === 'endDate') {
        return new Date(value)
      } else if (key === 'imagesListURL') {
        if (Array.isArray(value)) {
          return value
        } else {
          return (value && size(value) > 0 && value.split(',')) || []
        }
      } else {
        return value
      }
    })
  }

  findExperience = (experienceSlug, memberId) => {
    const { experiences } = this.props
    return find(experiences, experience => {
      if (experience.slug === experienceSlug && experience.authors.includes(memberId)) {
        return true
      } else {
        return false
      }
    })
  }

  onDelete = async () => {
    const { i18n, lang, memberId, deleteExperience, experienceSlug, children } = this.props
    const experienceData = this.findExperience(experienceSlug, memberId)
    let error
    const onDone = ({ data, error }) => {
      return error
    }

    if (!experienceData) {
      return <Error status={404} children={children} i18n={i18n} lang={lang} />
    }

    this.setState({ loading: true, error: null })

    const modalConfirmation = window.confirm(i18n.t('experiences:delete', { title: experienceData.slug }))
    if (modalConfirmation === true) {
      error = await deleteExperience(experienceData.id).then(onDone)
    }

    if (error) {
      this.setState({ loading: false, error })
    } else {
      window.location.href = '/experiences'
    }
  }

  onSubmit = async data => {
    const { updateExperience, createExperience } = this.props
    const filteredData = this.filterData(data)
    const onDone = ({ data, error }) => {
      return error
    }
    const { id } = data
    let error

    this.setState({ loading: true, error: null })

    if (id) {
      error = await updateExperience(filteredData).then(onDone)
    } else {
      error = await createExperience(filteredData).then(onDone)
      if (!error) {
        window.location.href = '/experiences'
      }
    }

    this.setState({ loading: false, error: (error && error.message) || null })
  }

  render() {
    const { memberId, user, experiences, experienceSlug, members, i18n, lang, children } = this.props
    const { loading, error } = this.state
    let experienceData = {}

    const fields = genFields({ i18n, lang, experiences, experienceSlug, members, memberId })

    if (user.state !== 'logged') {
      return <Error status={403} children={children} i18n={i18n} lang={lang} />
    }

    if (experienceSlug && memberId) {
      experienceData = this.findExperience(experienceSlug, memberId)

      if (!experienceData) {
        return <Error status={404} children={children} i18n={i18n} lang={lang} />
      }
    }

    return (
      <Fragment>
        <Head i18n={i18n} title={experienceData.title && experienceData.title[lang]} />

        <div className="Block" ref={node => (this.block = node)}>
          {children} {/*Header*/}
          <div className="Breadcrumb">
            <ul className="Breadcrumb-inner">
              <li className="Breadcrumb-item">
                <Link page="/experiences">
                  <a className="Breadcrumb-link">{i18n.t('experiences:title')}</a>
                </Link>
              </li>
              {!isEmpty(experienceData) && (
                <Fragment>
                  <li className="Breadcrumb-item Breadcrumb-item--separator">></li>
                  <li className="Breadcrumb-item">{experienceData.title && experienceData.title[lang]}</li>
                </Fragment>
              )}
            </ul>
          </div>
          <div className="Block-content">
            <Form
              i18n={i18n}
              onSubmit={this.onSubmit}
              onDelete={this.onDelete}
              fields={fields}
              formData={experienceData}
              disabled={loading}
            />
            {error && <p className="Text Color--error u-tSpace--m">{error}</p>}
          </div>
        </div>
      </Fragment>
    )
  }
}

ExperienceEdit.prototype.translateNS = ['experiences', 'form']

ExperienceEdit.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  experiences: PropTypes.instanceOf(Array).isRequired,
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
    updateExperience: bindActionCreators(updateExperience, dispatch),
    createExperience: bindActionCreators(createExperience, dispatch),
    deleteExperience: bindActionCreators(deleteExperience, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceEdit)
