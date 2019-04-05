import React from 'react'
import { find, map, sortBy, filter, each } from 'lodash'
import { countries } from 'country-data'
import ReactMarkdown from 'react-markdown'
import isoCountries from 'i18n-iso-countries'

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

export default ({ i18n, experiences, experienceSlug, members, lang }) => {
  each(['es', 'en'], lang => {
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
      label: i18n.t('experiences:slug.label'),
      desc: i18n.t('experiences:slug.desc'),
      readOnly: !!experienceSlug,
      validate: value => {
        if (experienceSlug) {
          return null
        }

        if (find(experiences, ['slug', value])) {
          return i18n.t('experiences:slug.unique')
        }

        if (!value) {
          return i18n.t('experiences:slug.empty')
        }

        if (!/[a-z]+/.test(value)) {
          return i18n.t('experiences:slug.weird')
        }

        return null
      }
    },
    {
      id: 'published',
      type: 'checkbox',
      label: i18n.t('experiences:published.label'),
      desc: i18n.t('experiences:published.desc')
    },
    {
      id: 'title',
      label: i18n.t('experiences:name.label'),
      desc: i18n.t('experiences:name.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('experiences:name.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: i18n.t('experiences:name.es'),
          type: 'string'
        }
      ]
    },
    {
      id: 'subtitle',
      label: i18n.t('experiences:_subtitle.label'),
      desc: i18n.t('experiences:_subtitle.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('experiences:_subtitle.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: i18n.t('experiences:_subtitle.es'),
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
      label: i18n.t('experiences:mainImageURL.label'),
      desc: textWithLinks(i18n.t('experiences:mainImageURL.desc'))
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
      label: i18n.t('experiences:imagesListURL.label'),
      desc: textWithLinks(i18n.t('experiences:imagesListURL.desc'))
    },
    {
      id: 'longDesc',
      label: i18n.t('experiences:longDesc.label'),
      desc: i18n.t('experiences:longDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('experiences:longDesc.en'),
          type: 'textarea'
        },
        {
          id: 'es',
          label: i18n.t('experiences:longDesc.es'),
          type: 'textarea'
        }
      ]
    },
    {
      id: 'shortDesc',
      label: i18n.t('experiences:shortDesc.label'),
      desc: i18n.t('experiences:shortDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('experiences:shortDesc.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: i18n.t('experiences:shortDesc.es'),
          type: 'string'
        }
      ]
    },
    {
      id: 'startDate',
      type: 'date',
      label: i18n.t('experiences:startDate.label'),
      desc: textWithLinks(i18n.t('experiences:startDate.desc'))
    },
    {
      id: 'endDate',
      type: 'date',
      label: i18n.t('experiences:endDate.label'),
      desc: textWithLinks(i18n.t('experiences:endDate.desc'))
    },
    {
      id: 'youtubeURL',
      type: 'string',
      label: i18n.t('experiences:youtubeURL.label'),
      desc: textWithLinks(i18n.t('experiences:youtubeURL.desc'))
    },
    {
      id: 'instagramTag',
      type: 'string',
      label: i18n.t('experiences:instagramTag.label'),
      desc: textWithLinks(i18n.t('experiences:instagramTag.desc'))
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
          return i18n.t('experiences:authors.error')
        } else {
          return null
        }
      },
      label: i18n.t('experiences:authors.label'),
      desc: i18n.t('experiences:authors.desc')
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
      optionRender: data => `${data.emoji || '🏳️'}  ${isoCountries.getName(data.value, lang) || '🤷🏽‍♂️'}`,
      label: i18n.t('experiences:countries.label'),
      desc: i18n.t('experiences:countries.desc')
    }
  ]
}
