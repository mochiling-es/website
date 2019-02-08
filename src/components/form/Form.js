import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { Form as TheForm } from 'informed'
import FontAwesome from 'react-fontawesome'
import { translate } from 'react-i18next'

import String from './String'
import Textarea from './Textarea'
import Select from './Select'
import Number from './Number'
import Image from './Image'
import Checkbox from './Checkbox'
import Arr from './Array'
import Obj from './Map'
import Hidden from './Hidden'
import Date from './Date'

const fieldTypes = {
  select: Select,
  number: Number,
  string: String,
  hidden: Hidden,
  date: Date,
  textarea: Textarea,
  checkbox: Checkbox,
  arr: Arr,
  obj: Obj,
  image: Image
}

class Form extends Component {
  state = {
    errors: {}
  }

  onError = errors => {
    this.setState({ errors })
  }

  onSubmit = data => {
    const { onSubmit } = this.props
    this.setState({ errors: {} })
    onSubmit(data)
  }

  render() {
    const { fields, disabled, formData = {}, t } = this.props
    const { errors } = this.state

    return (
      <TheForm onSubmit={this.onSubmit} onSubmitFailure={this.onError} className="Form">
        {map(fields, field => {
          const Field = fieldTypes[field.type]
          if (Field) {
            return <Field key={field.id} {...field} disabled={disabled} value={formData[field.id]} />
          }
          return null
        })}
        <div className="Form-field Form-footer">
          <button disabled={disabled} className={`Button Button--action Form-submit`} type="submit">
            <span>{t('submit')}</span>
            {disabled && <FontAwesome className="u-lSpace--m" name="circle-o-notch" spin size="lg" />}
          </button>
          <div className="Form-errors">
            {map(errors, (error, i) => (
              <p key={i} className="Text Color--error u-tSpace--m">
                {error}
              </p>
            ))}
          </div>
        </div>
      </TheForm>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.instanceOf(Array).isRequired,
  disabled: PropTypes.bool,
  formData: PropTypes.instanceOf(Object)
}

export default translate(['form'])(Form)
