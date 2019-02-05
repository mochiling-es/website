import React from 'react'
import { Select, Option } from 'informed'
import { map } from 'lodash'

export default ({
  desc,
  multiple,
  optionRender,
  disabled,
  readOnly,
  validate,
  id,
  value,
  label,
  options,
  placeholder
}) => {
  return (
    <div className="Form-field">
      {label && (
        <label className="Form-fieldLabel Text Text--large Text--strong Color--main" htmlFor={id}>
          {label}
        </label>
      )}
      {desc && <p className="Form-fieldDesc Text Text--medLarge Color--paragraph u-tSpace--m">{desc}</p>}
      <Select
        className="Form-fieldSelect Text Text--medLarge"
        field={id}
        id={`field-${id}`}
        validate={validate}
        initialValue={value}
        disabled={disabled || readOnly}
        multiple={multiple}
      >
        {placeholder && !value && (
          <Option value="" disabled>
            {placeholder}
          </Option>
        )}
        {map(options, (option, i) => {
          return (
            <Option key={`${option.value || option}-${i}`} value={option.value || option}>
              {(optionRender && optionRender(option)) || option.label || option}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}
