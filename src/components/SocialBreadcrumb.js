import React from 'react'
import FontAwesome from 'react-fontawesome'

import config from '../../utils/config'

const SocialBreadcrumb = props => {
  const { i18n } = props
  const { facebookId, twitterId, instagramId } = config

  return (
    <div className="Breadcrumb">
      <ul className="Breadcrumb-inner">
        <li className="Breadcrumb-item u-rSpace--xl">{i18n.t('common:contact-us')}</li>

        {facebookId && (
          <li className="Breadcrumb-item u-rSpace--xl">
            <a
              href={`http://facebook.com/${facebookId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="Breadcrumb-link"
            >
              <FontAwesome name="facebook" className="Breadcrumb-linkIcon" />
              <span className="Breakcrumb-linkDesc u-lSpace">Facebook</span>
            </a>
          </li>
        )}

        {twitterId && (
          <li className="Breadcrumb-item u-rSpace--xl">
            <a
              href={`http://twitter.com/${twitterId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="Breadcrumb-link"
            >
              <FontAwesome name="twitter" className="Breadcrumb-linkIcon" />
              <span className="Breakcrumb-linkDesc u-lSpace">Twitter</span>
            </a>
          </li>
        )}

        {instagramId && (
          <li className="Breadcrumb-item">
            <a
              href={`http://instagram.com/${instagramId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="Breadcrumb-link"
            >
              <FontAwesome name="instagram" className="Breadcrumb-linkIcon" />
              <span className="Breakcrumb-linkDesc u-lSpace">Instagram</span>
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SocialBreadcrumb
