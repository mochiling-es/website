import React from 'react'
import { find, map, sortBy, filter, each } from 'lodash'
import { countries } from 'country-data'
import ReactMarkdown from 'react-markdown'
import isoCountries from 'i18n-iso-countries'

import { i18nHelper } from '../../src/components/i18n'

const textWithLinks = text => {
  return (
    <ReactMarkdown
      source={text}
      renderers={{
        paragraph: props => {
          return props.children
        },
        link: props => {
          return (
            <a href={props.href} target="_blank" rel="noopener noreferrer" className="Color--emphasis">
              {props.children}
            </a>
          )
        }
      }}
    />
  )
}

export default ({ t, experiences, experienceSlug, members, memberId }) => {
  each(i18nHelper.supportLangs, lang => {
    isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
  })

  return [
    {
      id: 'id',
      type: 'hidden'
    },
    {
      id: 'slug',
      type: 'string',
      label: t('slug.label'),
      desc: t('slug.desc'),
      readOnly: !!experienceSlug,
      validate: value => {
        if (experienceSlug) {
          return null
        }

        if (find(experiences, ['slug', value])) {
          return t('slug.unique')
        }

        if (!value) {
          return t('slug.empty')
        }

        if (!/[a-z]+/.test(value)) {
          return t('slug.weird')
        }

        return null
      }
    },
    {
      id: 'published',
      type: 'checkbox',
      label: t('published.label'),
      desc: t('published.desc')
    },
    {
      id: 'title',
      label: t('name.label'),
      desc: t('name.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: t('name.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: t('name.es'),
          type: 'string'
        }
      ]
    },
    {
      id: 'subtitle',
      label: t('_subtitle.label'),
      desc: t('_subtitle.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: t('_subtitle.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: t('_subtitle.es'),
          type: 'string'
        }
      ]
    },
    {
      id: 'mainImageURL',
      type: 'image',
      options: {
        limit: 1,
        ref: 'experiences',
        maxHeight: 900,
        maxWidth: 1200
      },
      label: t('mainImageURL.label'),
      desc: textWithLinks(t('mainImageURL.desc'))
    },
    {
      id: 'imagesListURL',
      type: 'image',
      options: {
        limit: 20,
        ref: 'experiences',
        maxWidth: 320,
        maxHeight: 320
      },
      label: t('imagesListURL.label'),
      desc: textWithLinks(t('imagesListURL.desc'))
    },
    {
      id: 'longDesc',
      label: t('longDesc.label'),
      desc: t('longDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: t('longDesc.en'),
          type: 'textarea'
        },
        {
          id: 'es',
          label: t('longDesc.es'),
          type: 'textarea'
        }
      ]
    },
    {
      id: 'shortDesc',
      label: t('shortDesc.label'),
      desc: t('shortDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: t('shortDesc.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: t('shortDesc.es'),
          type: 'string'
        }
      ]
    },
    {
      id: 'startDate',
      type: 'date',
      label: t('startDate.label'),
      desc: textWithLinks(t('startDate.desc'))
    },
    {
      id: 'endDate',
      type: 'date',
      label: t('endDate.label'),
      desc: textWithLinks(t('endDate.desc'))
    },
    {
      id: 'youtubeURL',
      type: 'string',
      label: t('youtubeURL.label'),
      desc: textWithLinks(t('youtubeURL.desc'))
    },
    {
      id: 'instagramTag',
      type: 'string',
      label: t('instagramTag.label'),
      desc: textWithLinks(t('instagramTag.desc'))
    },
    {
      id: 'authors',
      type: 'select',
      multiple: true,
      options: sortBy(
        map(filter(members, member => !!member.published), member => {
          return {
            label: member.name,
            value: member.id
          }
        }),
        ['label']
      ),
      validate: value => {
        if (!value) {
          return t('authors.error')
        } else {
          return null
        }
      },
      label: t('authors.label'),
      desc: t('authors.desc')
    },
    {
      id: 'countries',
      type: 'select',
      multiple: true,
      options: sortBy(
        map(filter(countries.all, country => !!country.alpha3), country => {
          return {
            label: country.name,
            value: country.alpha3,
            emoji: country.emoji
          }
        }),
        ['label']
      ),
      optionRender: data =>
        `${data.emoji || '🏳️'}  ${isoCountries.getName(data.value, i18nHelper.getCurrentLanguage()) || '🤷🏽‍♂️'}`,
      label: t('countries.label'),
      desc: t('countries.desc')
    }
  ]
}
