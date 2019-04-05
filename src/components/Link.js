import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import { getLinkProps } from '../utils'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  const result = getLinkProps({
    href: props.href,
    as: props.as,
    page: props.page,
    lang: props.lang || router.query.lang || 'es',
    params: props.params || {}
  })

  let className = child.props.className || null

  if (router.route === props.href && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }

  delete props.activeClassName
  delete props.page
  delete props.params
  delete props.lang

  return (
    <Link as={result.as} href={result.href} {...props}>
      {React.cloneElement(child, { className })}
    </Link>
  )
}

export default withRouter(ActiveLink)
