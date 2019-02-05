import React, { Component } from 'react'
import { map, size, omit } from 'lodash'
import FileUploader from 'react-firebase-file-uploader'
import { Text } from 'informed'
import ImageZoom from 'react-medium-image-zoom'
import FontAwesome from 'react-fontawesome'

import { loadDB } from '../../../lib/db'

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

  deleteImage = url => {
    const { images } = this.state
    this.setState({ images: omit(images, url) })
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })

  handleUploadError = error => {
    this.setError({ isUploading: false, error: error.message })
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
        this.setState({ images })
      })
  }

  handleProgress = progress => this.setState({ progress })

  render() {
    const { id, label, desc, mask, validate, options, disabled, readOnly } = this.props
    const { images, limit } = this.state

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
        <ul className="Form-imageList">
          {map(images, (image, i) => {
            return (
              <li className="Form-imageItem">
                <button className="Form-imageDelete">
                  <FontAwesome name="crossbar" />
                </button>
                <ImageZoom
                  image={{
                    src: image,
                    className: 'Form-imagePreview',
                    style: { height: '120px' }
                  }}
                  zoomImage={{
                    src: 'image'
                  }}
                />
              </li>
            )
          })}
        </ul>

        {limit < size(images) && (
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            maxHeight={options.maxHeight || 512}
            maxWidth={options.maxWidth || 512}
            storageRef={this.db.storage().ref(options.ref)}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
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
      </div>
    )
  }
}

export default Image
