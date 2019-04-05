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

export default ({ members, memberId, i18n, lang }) => {
  each(['es', 'en'], lang => {
    isoCountries.registerLocale(require(`i18n-iso-countries/langs/${lang}.json`))
  })

  return [
    {
      id: 'id',
      type: 'string',
      label: i18n.t('team:id.label'),
      desc: i18n.t('team:id.desc'),
      readOnly: !!memberId,
      validate: value => {
        if (memberId) {
          return null
        }

        if (find(members, ['id', value])) {
          return i18n.t('team:id.unique')
        }

        if (!value) {
          return i18n.t('team:id.empty')
        }

        if (!/[a-z]+/.test(value)) {
          return i18n.t('team:id.weird')
        }

        return null
      }
    },
    {
      id: 'name',
      type: 'string',
      label: i18n.t('team:name.label'),
      validate: value => {
        return !value ? i18n.t('team:name.error') : null
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
      label: i18n.t('team:avatarURL.label'),
      desc: textWithLinks(i18n.t('team:avatarURL.desc'))
    },
    {
      id: 'gender',
      type: 'select',
      label: i18n.t('team:gender.label'),
      desc: i18n.t('team:gender.desc'),
      placeholder: i18n.t('team:gender.placeholder'),
      options: [
        {
          label: i18n.t('team:gender.male'),
          value: 'male'
        },
        {
          label: i18n.t('team:gender.female'),
          value: 'female'
        }
      ],
      readOnly: false,
      validate: value => {
        return value !== 'male' && value !== 'female' ? i18n.t('team:gender.error') : null
      }
    },
    {
      id: 'bornLocation',
      label: i18n.t('team:bornLocation.label'),
      desc: textWithLinks(i18n.t('team:bornLocation.desc')),
      type: 'arr',
      items: [
        {
          id: 'longitude',
          label: i18n.t('team:bornLocation.longitude'),
          type: 'number',
          validate: value => {
            return isNaN(value) || value > 180 || value < -180 ? i18n.t('team:bornLocation.error') : null
          }
        },
        {
          id: 'latitude',
          label: i18n.t('team:bornLocation.latitude'),
          type: 'number',
          validate: value => {
            return isNaN(value) || value > 180 || value < -180 ? i18n.t('team:bornLocation.error') : null
          }
        }
      ]
    },
    {
      id: 'role',
      type: 'select',
      label: i18n.t('team:role.label'),
      desc: i18n.t('team:role.desc'),
      placeholder: i18n.t('team:role.placeholder'),
      options: [
        {
          label: i18n.t('team:role.founder'),
          value: 'founder'
        },
        {
          label: i18n.t('team:role.expert'),
          value: 'expert'
        },
        {
          label: i18n.t('team:role.webmaster'),
          value: 'webmaster'
        }
      ],
      readOnly: false,
      validate: value => {
        return value !== 'founder' && value !== 'webmaster' && value !== 'expert' ? i18n.t('team:role.error') : null
      }
    },
    {
      id: 'longDesc',
      label: i18n.t('team:longDesc.label'),
      desc: i18n.t('team:longDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('team:longDesc.en'),
          type: 'textarea'
        },
        {
          id: 'es',
          label: i18n.t('team:longDesc.es'),
          type: 'textarea'
        }
      ]
    },
    {
      id: 'shortDesc',
      label: i18n.t('team:shortDesc.label'),
      desc: i18n.t('team:shortDesc.desc'),
      type: 'obj',
      items: [
        {
          id: 'en',
          label: i18n.t('team:shortDesc.en'),
          type: 'string'
        },
        {
          id: 'es',
          label: i18n.t('team:shortDesc.es'),
          type: 'string'
        }
      ]
    },

    {
      id: 'instagramId',
      type: 'string',
      label: i18n.t('team:instagramId.label'),
      desc: textWithLinks(i18n.t('team:instagramId.desc'))
    },
    {
      id: 'facebookId',
      type: 'string',
      label: i18n.t('team:facebookId.label'),
      desc: textWithLinks(i18n.t('team:facebookId.desc'))
    },
    {
      id: 'twitterId',
      type: 'string',
      label: i18n.t('team:twitterId.label'),
      desc: textWithLinks(i18n.t('team:twitterId.desc'))
    },
    {
      id: 'published',
      type: 'checkbox',
      label: i18n.t('team:published.label'),
      desc: i18n.t('team:published.desc')
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
      optionRender: data => `${data.value || '🏳️'}  ${isoCountries.getName(data.alpha3, lang) || '🤷🏽‍♂️'}`,
      label: i18n.t('team:languages.label'),
      desc: i18n.t('team:languages.desc')
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
      optionRender: data => `${data.emoji || '🏳️'}  ${isoCountries.getName(data.value, lang) || '🤷🏽‍♂️'}`,
      label: i18n.t('team:visitedCountries.label'),
      desc: i18n.t('team:visitedCountries.desc')
    }
  ]
}
