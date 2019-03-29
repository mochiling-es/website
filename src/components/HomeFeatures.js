import React, { Component } from 'react'
import { map } from 'lodash'
import { translate } from 'react-i18next'
import FontAwesome from 'react-fontawesome'

class HomeFeatures extends Component {
  render() {
    const { features, t } = this.props
    return (
      <ul className="Proposals-featuresList u-bSpace--xxl pure-g">
        {map(features, feature => {
          return (
            <li className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-2 pure-u-lg-1-3">
              <div className="l-box">
                <div className="Proposals-featureItem Proposals-featureItem--noBkg">
                  <div className="Proposals-featureItemIcon Color--paragraph">
                    <FontAwesome name={feature.icon} />
                  </div>
                  <h5 className="Proposals-featureItemTitle Text Text--medLarge Text--strong Text--uppercase Color--paragraph u-tSpace--m">
                    {t(`features.${feature.name}.title`)}
                  </h5>
                  <p className="Proposals-featureItemDesc Text Text--medLarge u-tSpace--m Color">
                    {t(`features.${feature.name}.desc`)}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default translate(['proposals'])(HomeFeatures)
