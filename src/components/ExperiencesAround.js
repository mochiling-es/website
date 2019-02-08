import React from 'react'
import { translate } from 'react-i18next'
import { size, filter, intersection, map, first } from 'lodash'
import ReactTooltip from 'react-tooltip'

import Link from './Link'
import { i18nHelper } from './i18n'

export default translate(['experiences'])(({ currentExperience, experiences, t }) => {
  const lang = i18nHelper.getCurrentLanguage()
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
      <h4 className="Text--small Text--uppercase">{t('other-experiences')}</h4>
      <ul className="Experience-contentSameExperiencesList u-tSpace--m">
        {map(experiencesAround, experience => {
          const { mainImageURL, slug } = experience
          const experienceFirstAuthorId = first(experience.authors)
          const experienceAs = `/experiences/${experienceFirstAuthorId}/${slug}`
          const experienceHref = `/experience?memberId=${experienceFirstAuthorId}&experienceSlug=${slug}`
          const experienceTitle = (experience.title && experience.title[lang]) || ''

          return (
            <li key={experience.id} data-tip={experienceTitle} data-for={`experience-around-${experience.id}`}>
              <Link href={experienceHref} as={experienceAs}>
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
})
