import React from 'react'
import { Text } from 'informed'

export default ({ desc, disabled, readOnly, validate, id, value, label }) => {
  let parsedDate = ''
  let date = ''

  if (value) {
    date = new Date(value && value.seconds * 1000)
  }

  if (date) {
    parsedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}
      {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}
      <Text
        className="Form-fieldInput"
        disabled={disabled || readOnly}
        field={id}
        validate={validate}
        id={`field-${id}`}
        initialValue={parsedDate}
      />
    </div>
  )
}
