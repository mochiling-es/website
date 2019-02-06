import React from 'react'
import { Checkbox } from 'informed'

export default ({ desc, disabled, readOnly, validate, id, value, label }) => {
  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="Form-fieldCheckbox">
        <Checkbox
          className="Form-fieldInput"
          disabled={disabled || readOnly}
          field={id}
          validate={validate}
          id={`field-${id}`}
          initialValue={value}
        />
        {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-lSpace--m">{desc}</p>}
      </div>
    </div>
  )
}
