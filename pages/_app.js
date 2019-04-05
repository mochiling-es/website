import React, { Fragment } from 'react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import ReactGA from 'react-ga'

import createStore from '../src/store/createStore'
import Layout from '../src/layouts/Default'
import config from '../utils/config'

import '../src/styles/common.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    // client-side only, run on page changes, do not run on server (SSR)
    if (typeof window === 'object') {
      ReactGA.pageview(ctx.asPath)
    }

    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {},
      router
    }
  }

  componentDidMount = () => {
    // client-side only, run once on mount
    ReactGA.initialize(config.googleAnalyticsId)
    ReactGA.pageview(window.location.pathname + window.location.search)
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
