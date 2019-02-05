import React from 'react'
import { map } from 'lodash'
import { Scope } from 'informed'

import String from './String'
import Textarea from './Textarea'
import Select from './Select'
import Number from './Number'

const objFieldTypes = {
  select: Select,
  number: Number,
  string: String,
  textarea: Textarea
}

export default ({ desc, disabled, readOnly, id, value, label, items }) => {
  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}
      {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}
      <div className="Form-fieldNested">
        <Scope scope={id}>
          {map(items, item => {
            const Field = objFieldTypes[item.type]

            if (Field) {
              return (
                <Field
                  key={id + item.id}
                  id={item.id}
                  field={item.id}
                  label={item.label}
                  disabled={disabled || item.readOnly || readOnly}
                  validate={item.validate}
                  value={value[item.id]}
                />
              )
            }
            return null
          })}
        </Scope>
      </div>
    </div>
  )
}
