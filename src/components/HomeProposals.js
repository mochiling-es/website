import React, { Component } from 'react'
import { map } from 'lodash'
import { Trans } from 'react-i18next'

import Link from './Link'

class HomeProposals extends Component {
  render() {
    const { proposals, i18n } = this.props

    return (
      <ul className="Home-proposals pure-g">
        {map([0, 2, 1], index => {
          const proposalIndex = index + 1

          return (
            <li key={proposalIndex} className="Home-proposal pure-u-1 pure-u-sm-1-1 pure-u-md-1-3 pure-u-lg-1-3">
              <div className="l-box Text">
                <div className={`Home-proposalIcon ${index === 2 ? 'Home-proposalIcon--emphasis' : ''}`}>
                  {proposals[index].icon}
                </div>
                <h4
                  className={`Text--large Text--uppercase ${
                    index !== 2 ? 'Color--paragraph' : 'Color--emphasis'
                  } u-tSpace--l`}
                >
                  {i18n.t(`proposals:items.${proposalIndex}.title`)}
                </h4>
                <p className="Text--medLarge Color--paragraph u-tSpace--m">
                  <Trans
                    i18n={i18n}
                    i18nKey={`proposals:items.${proposalIndex}.desc`}
                    components={[<span className="Color--emphasis">.</span>]}
                  />{' '}
                </p>
                <Link page={'/proposals'} params={{ proposalId: proposalIndex }}>
                  <a className="Button {% if index != 2 %} Button--small Button--secondary {% else %} Button--main {% endif %} u-tSpace--l">
                    {i18n.t('common:learn-more')}
                  </a>
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default HomeProposals
