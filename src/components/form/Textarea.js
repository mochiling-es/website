import React from 'react'
import { TextArea } from 'informed'

export default ({ desc, disabled, readOnly, validate, id, value, label }) => {
  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}
      {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}
      <TextArea
        className="Form-fieldTextarea"
        disabled={disabled || readOnly}
        field={id}
        validate={validate}
        id={`field-${id}`}
        initialValue={value}
      />
    </div>
  )
}
