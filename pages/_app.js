import React, { Fragment } from 'react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
// import Router from 'next/router'
// import withGA from 'next-ga'
// (withGA(config.googleAnalyticsId, Router))

import createStore from '../src/store/createStore'
import Layout from '../src/layouts/Default'
import config from '../utils/config'

import '../src/styles/common.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    }
  }

  render() {
    const { Component, pageProps, store, router } = this.props
    const { lang = 'es' } = router.query

    return (
      <Container>
        <Provider store={store}>
          <Fragment>
            <Layout lang={lang}>
              <Component lang={lang} router={router} {...pageProps} />
            </Layout>
          </Fragment>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(MyApp)
