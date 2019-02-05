import React, { Component } from 'react'
import { map, size, pull } from 'lodash'
import FileUploader from 'react-firebase-file-uploader'
import { Text } from 'informed'
import ImageZoom from 'react-medium-image-zoom'
import FontAwesome from 'react-fontawesome'

import { loadDB } from '../../../lib/db'
import { withNamespaces } from '../../../i18n'

class Image extends Component {
  state = {
    error: null,
    images: [],
    isUploading: false,
    progress: 0,
    limit: 100
  }

  constructor(props) {
    super(props)

    if (props.value) {
      this.state.images = [props.value]
    }

    if (props.options && props.options.limit) {
      this.state.limit = props.options.limit
    }

    this.db = loadDB()
  }

  onDelete = url => {
    const { images } = this.state
    this.setState({ images: pull(images, url) })
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })

  handleUploadError = error => {
    this.setState({ isUploading: false, error: error.message })
  }

  handleUploadSuccess = filename => {
    const { options } = this.props
    const { images } = this.state

    this.db
      .storage()
      .ref(options.ref)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        images.push(url)
        this.setState({ images, isUploading: false })
      })
  }

  handleProgress = progress => this.setState({ progress })

  render() {
    const { id, label, desc, mask, validate, options, disabled, readOnly, t } = this.props
    const { images, limit, isUploading, error } = this.state

    if (!this.db) {
      return null
    }

    return (
      <div className="Form-field">
        {label && (
          <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
            {label}
          </label>
        )}
        {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}
        <ul className="Form-imageList u-tSpace--xl">
          {map(images, (image, i) => {
            return (
              <li key={i} className="Form-imageItem">
                <button className="Form-imageDelete" onClick={() => this.onDelete(image)}>
                  <FontAwesome name="times" className="Color--error" />
                </button>
                <ImageZoom
                  image={{
                    src: image,
                    className: 'Form-imagePreview'
                  }}
                />
              </li>
            )
          })}
        </ul>

        {limit > size(images) && (
          <label disabled={isUploading} className="Form-imageButton Button Button--secondary u-tSpace--l">
            {t('upload')}

            {isUploading && <FontAwesome className="u-lSpace--m" name="circle-o-notch" spin size="lg" />}
            <FileUploader
              hidden
              accept="image/*"
              randomizeFilename
              maxHeight={options.maxHeight || 512}
              maxWidth={options.maxWidth || 512}
              storageRef={this.db.storage().ref(options.ref)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </label>
        )}

        <Text
          hidden
          mask={mask}
          disabled={disabled || readOnly}
          field={id}
          validate={validate}
          id={`field-${id}`}
          initialValue={images.join(',')}
        />

        {error && <p className="Text Text--medLarge Color--error u-tSpace--l">{error}</p>}
      </div>
    )
  }
}

export default withNamespaces('form')(Image)
