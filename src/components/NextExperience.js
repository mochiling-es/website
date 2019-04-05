import React from 'react'
import FontAwesome from 'react-fontawesome'

import Link from './Link'

const NextExperience = ({ experienceData, i18n, lang }) => {
  const title = (experienceData.title && experienceData.title[lang]) || ''
  const slug = experienceData.slug
  const memberId = experienceData.authors[0]
  const shortDesc = (experienceData.title && experienceData.shortDesc[lang]) || ''

  return (
    <div className="Block Bkg--light Experience-nextOne u-tSpace--xxxl">
      <div className="Experience-nextOneImage" style={{ backgroundImage: `url(${experienceData.mainImageURL})` }} />
      <div className="Experience-nextOneContent">
        <div className="Block-content Paragraph--centered Text ">
          <h4 className="Text--strong Text--huge Color--secondary">{i18n.t('experiences:next-experience')}</h4>
          <p className="Text--large u-tSpace--l Color--paragraph">{shortDesc}</p>
          <Link page={'/experience'} params={{ memberId, experienceSlug: slug }}>
            <a className="Button Button--main u-tSpace--l Button--inliner">
              <FontAwesome name="globe" className="u-rSpace" />
              <span>{title}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NextExperience
