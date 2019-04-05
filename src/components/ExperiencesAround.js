import React from 'react'
import { size, filter, intersection, map, first } from 'lodash'
import ReactTooltip from 'react-tooltip'

import Link from './Link'

export default ({ currentExperience, experiences, i18n, lang }) => {
  const experiencesAround = filter(experiences, experience => {
    return (
      size(intersection(experience.countries, currentExperience.countries)) > 0 &&
      currentExperience.slug !== experience.slug &&
      experience.published
    )
  })

  if (size(experiencesAround) === 0) {
    return null
  }

  return (
    <div className="Experience-contentSameExperiences Color--light Text--withShadow">
      <h4 className="Text--small Text--uppercase">{i18n.t('experiences:other-experiences')}</h4>
      <ul className="Experience-contentSameExperiencesList u-tSpace--m">
        {map(experiencesAround, experience => {
          const { mainImageURL, slug } = experience
          const experienceFirstAuthorId = first(experience.authors)
          const experienceTitle = (experience.title && experience.title[lang]) || ''

          return (
            <li key={experience.id} data-tip={experienceTitle} data-for={`experience-around-${experience.id}`}>
              <Link page={'/experience'} params={{ memberId: experienceFirstAuthorId, experienceSlug: slug }}>
                <a className="Experience-authorLink Color--light">
                  <img
                    src={mainImageURL}
                    className="Experience-aroundImage u-tSpace"
                    alt={experienceTitle}
                    title={experienceTitle}
                  />
                  <ReactTooltip effect="solid" place="top" type="light" id={`experience-around-${experience.id}`}>
                    <span className="Text Text--med Experience-text--noShadow">{experienceTitle}</span>
                  </ReactTooltip>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
