import React, { Component } from 'react'
import Head from 'next/head'

import { translate } from 'react-i18next'
import config from '../../utils/config'

class HTMLHead extends Component {
  render() {
    const { t } = this.props
    const title = this.props.title ? `${this.props.title} · ${config.name}` : config.name
    const description = this.props.description || t('description')
    const image = this.props.image || '/static/assets/favicon/favicon-96x96.png'
    const keywords = this.props.keywords || t('keywords')

    return (
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <meta name="keywords" content={keywords} />

        {/* Google */}
        <meta itemprop="name" content={title} />
        <meta itemprop="description" content={description} />
        <meta itemprop="image" content={image} />

        {/* Twitter */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image:src" content={image} />

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={image} />
        <meta name="og:url" content={config.baseURL} />
      </Head>
    )
  }
}

export default translate(['common'])(HTMLHead)
