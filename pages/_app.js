import React, {Fragment} from 'react'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import Head from 'next/head'
import App, { Container } from 'next/app'

import createStore from '../src/store/createStore'
import Layout from '../src/layouts/Default'

import '../src/styles/common.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    }
  }

  render() {
    const { Component, pageProps, store, router } = this.props

    return (
      <Container>
        <Provider store={store}>
        <Fragment>
          {/* HACK: We need this in order to load Firebase because Now.sh
          deploys doesn't like Firebase as npm package */}
          <Head>
            <script src='https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js' />
            <script src='https://www.gstatic.com/firebasejs/5.8.2/firebase-auth.js' />
            <script src='https://www.gstatic.com/firebasejs/5.8.2/firebase-firestore.js' />
            <script src='https://www.gstatic.com/firebasejs/5.8.2/firebase-storage.js' />
          </Head>
          <Layout>
            <Component router={router} {...pageProps} />
          </Layout>
          </Fragment>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(MyApp)
