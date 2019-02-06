import React, { Component, Fragment } from 'react'
import { map, size, pull } from 'lodash'
import FileUploader from 'react-firebase-file-uploader'
import { asField } from 'informed'
import ImageZoom from 'react-medium-image-zoom'
import FontAwesome from 'react-fontawesome'

import { loadDB } from '../../../lib/db'
import { withNamespaces } from '../../../i18n'

const ImagesInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { value } = fieldState
  const { setValue, setTouched } = fieldApi
  const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props

  return (
    <Fragment>
      <input
        {...rest}
        ref={forwardedRef}
        hidden
        value={!value && value !== 0 ? '' : value}
        onChange={e => {
          setValue(e.target.value)
          if (onChange) {
            onChange(e)
          }
        }}
        onBlur={e => {
          setTouched()
          if (onBlur) {
            onBlur(e)
          }
        }}
      />
    </Fragment>
  )
})

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

  componentDidUpdate = (prevProps, prevState) => {
    const { images } = this.state

    if (size(prevState.images) !== size(images) && this.input) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
      nativeInputValueSetter.call(this.input, images.join(','))
      const event = new Event('input', { bubbles: true })
      this.input.dispatchEvent(event)
    }
  }

  onDelete = url => {
    this.setState(prevState => ({
      images: prevState.images.filter(item => item !== url)
    }))
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })

  handleUploadError = error => {
    this.setState({ isUploading: false, error: error.message })
  }

  handleUploadSuccess = filename => {
    const { options } = this.props

    this.db
      .storage()
      .ref(options.ref)
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState(prevState => ({
          images: [...prevState.images, url],
          isUploading: false
        }))
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

        <ImagesInput
          mask={mask}
          disabled={disabled || readOnly}
          field={id}
          validate={validate}
          id={`field-${id}`}
          forwardedRef={node => (this.input = node)}
          initialValue={this.props.value}
        />

        {error && <p className="Text Text--medLarge Color--error u-tSpace--l">{error}</p>}
      </div>
    )
  }
}

export default withNamespaces('form')(Image)
