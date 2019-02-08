import React from 'react'
import { Text } from 'informed'

export default ({ id, value }) => {
  return <Text type="hidden" hidden field={id} id={`field-${id}`} initialValue={value} />
}
