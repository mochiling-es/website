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

export default ({ members, memberId, t }) => {
  each(i18nHelper.supportLangs, lang => {
    isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
  })

  return [
    {
      id: 'id',
      type: 'string',
      label: t('id.label'),
      desc: t('id.desc'),
      readOnly: !!memberId,
      validate: value => {
        if (memberId) {
          return null
        }

        if (find(members, ['id', value])) {
          return t('id.unique')
        }

        if (!value) {
          return t('id.empty')
        }

        if (!/[a-z]+/.test(value)) {
          return t('id.weird')
        }

        return null
      }
    },
    {
      id: 'name',
      type: 'string',
      label: t('name.label'),
      validate: value => {
        return !value ? t('name.error') : null
      }
    },
    {
      id: 'avatarURL',
      type: 'image',
      options: {
        limit: 1,
        ref: 'members',
        maxHeight: 120,
        maxWidth: 120
      },
      label: t('avatarURL.label'),
      desc: textWithLinks(t('avatarURL.desc'))
    },
    {
      id: 'gender',
      type: 'select',
      label: t('gender.label'),
      desc: t('gender.desc'),
      placeholder: t('gender.placeholder'),
      options: [
        {
          label: t('gender.male'),
          value: 'male'
        },
        {
          label: t('gender.female'),
          value: 'female'
        }
      ],
      readOnly: false,
      validate: value => {
        return value !== 'male' && value !== 'female' ? t('gender.error') : null
      }
    },
    {
      id: 'bornLocation',
      label: t('bornLocation.label'),
      desc: textWithLinks(t('bornLocation.desc')),
      type: 'arr',
      items: [
        {
          id: 'longitude',
          label: t('bornLocation.longitude'),
          type: 'number',
          validate: value => {
            return isNaN(value) || value > 180 || value < -180 ? t('bornLocation.error') : null
          }
        },
        {
          id: 'latitude',
          label: t('bornLocation.latitude'),
          type: 'number',
          validate: value => {
            return isNaN(value) || value > 180 || value < -180 ? t('bornLocation.error') : null
          }
        }
      ]
    },
    {
      id: 'role',
      type: 'select',
      label: t('role.label'),
      desc: t('role.desc'),
      placeholder: t('role.placeholder'),
      options: [
        {
          label: t('role.founder'),
          value: 'founder'
        },
        {
          label: t('role.expert'),
          value: 'expert'
        },
        {
          label: t('role.webmaster'),
          value: 'webmaster'
        }
      ],
      readOnly: false,
      validate: value => {
        return value !== 'founder' && value !== 'webmaster' && value !== 'expert' ? t('role.error') : null
      }
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
      id: 'instagramId',
      type: 'string',
      label: t('instagramId.label'),
      desc: textWithLinks(t('instagramId.desc'))
    },
    {
      id: 'facebookId',
      type: 'string',
      label: t('facebookId.label'),
      desc: textWithLinks(t('facebookId.desc'))
    },
    {
      id: 'twitterId',
      type: 'string',
      label: t('twitterId.label'),
      desc: textWithLinks(t('twitterId.desc'))
    },
    {
      id: 'published',
      type: 'checkbox',
      label: t('published.label'),
      desc: t('published.desc')
    },
    {
      id: 'languages',
      type: 'select',
      multiple: true,
      options: sortBy(
        map(filter(countries.all, country => !!country.emoji), country => {
          return {
            label: country.name,
            value: country.emoji,
            alpha3: country.alpha3
          }
        }),
        ['label']
      ),
      optionRender: data =>
        `${data.value || '🏳️'}  ${isoCountries.getName(data.alpha3, i18nHelper.getCurrentLanguage()) || '🤷🏽‍♂️'}`,
      label: t('languages.label'),
      desc: t('languages.desc')
    },
    {
      id: 'visitedCountries',
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
      label: t('visitedCountries.label'),
      desc: t('visitedCountries.desc')
    }
  ]
}
