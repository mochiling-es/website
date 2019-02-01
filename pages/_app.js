import React from 'react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'

import createStore from 'store/createStore'
import { appWithTranslation } from '../i18n'
import Layout from '../src/layouts/Default'

import '../src/styles/common.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    }
  }

  componentDidMount() {
    // if (this.props.lang) {
    //   i18n.changeLanguage(this.props.lang)
    // } else {
    //   i18n.changeLanguage('es')
    // }
  }

  render() {
    const { Component, pageProps, store, router } = this.props

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component router={router} {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(appWithTranslation(MyApp))
