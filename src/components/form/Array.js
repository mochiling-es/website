import React from 'react'
import { map } from 'lodash'
import String from './String'
import Textarea from './Textarea'
import Select from './Select'
import Number from './Number'

const arrayFieldTypes = {
  select: Select,
  number: Number,
  string: String,
  textarea: Textarea
}

export default ({ mask, desc, disabled, readOnly, validate, id, value, label, items }) => {
  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}
      {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}

      <div className="Form-fieldNested">
        {map(items, (item, index) => {
          const Field = arrayFieldTypes[item.type]
          if (Field) {
            return (
              <Field
                mask={mask}
                key={item.id}
                id={`${id}[${index}]`}
                label={item.label}
                disabled={disabled || item.readOnly || readOnly}
                validate={item.validate}
                value={(value && value[index]) || ''}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
