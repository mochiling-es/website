import React from 'react'
import { size, map } from 'lodash'
import ReactTooltip from 'react-tooltip'

import Link from './Link'

export default ({ members, authors, i18n }) => {
  return (
    <ul className="Text Color--light Experience-authors">
      {map(members, memberData => {
        const { name, avatarURL, id } = memberData

        if (authors.includes(id)) {
          return (
            <li key={id} className="Experience-author" data-tip={name} data-for={size(authors) > 1 ? id : ''}>
              <Link page={'/member'} params={{ memberId: id }}>
                <a className="Experience-authorLink Text--med Color--light">
                  <img className="Experience-authorImage u-rSpace" src={avatarURL} title={name} alt={name} />
                  {size(authors) < 2 && <span>{name}</span>}
                  {size(authors) > 1 && (
                    <ReactTooltip effect="solid" place="top" type="light" id={id}>
                      <span className="Text Text--med Experience-text--noShadow">{name}</span>
                    </ReactTooltip>
                  )}
                </a>
              </Link>
            </li>
          )
        }
      })}
      {size(authors) > 1 && (
        <span className="u-lSpace--m">{i18n.t('experiences:n-members', { count: size(authors) })}</span>
      )}
    </ul>
  )
}
