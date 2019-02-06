import React from 'react'
import { find, map, sortBy, filter } from 'lodash'
import { countries } from 'country-data'
import ReactMarkdown from 'react-markdown'

const textWithLinks = text => {
  return (
    <ReactMarkdown
      source={text}
      renderers={{
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
  return [
    {
      id: 'id',
      type: 'string',
      label: t('id.label'),
      desc: t('id.desc'),
      readOnly: !!memberId,
      validate: value => {
        return memberId ? null : find(members, ['id', value]) ? t('id.error') : null
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
      id: 'languages',
      type: 'select',
      multiple: true,
      options: sortBy(
        map(filter(countries.all, country => !!country.emoji), country => {
          return {
            label: country.name,
            value: country.emoji,
            emoji: country.emoji
          }
        }),
        ['label']
      ),
      optionRender: data => data.emoji + ' ' + data.label,
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
      optionRender: data => `${data.emoji || '🏳️'}  ${data.label}`,
      label: t('visitedCountries.label'),
      desc: t('visitedCountries.desc')
    }
  ]
}
