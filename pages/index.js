import React, { Fragment } from 'react'
import Head from 'next/head'

import { withNamespaces } from '../i18n'

class Index extends React.Component {
  render() {
    return (
      <Fragment>
        <Head>
          <title>Mochiling</title>
          <meta name="title" content="Mochiling" />
          <meta name="description" content=''  />
        </Head>
        <div>home</div>
      </Fragment>
    )
  }
}

export default withNamespaces(['index', 'common'])(Index)