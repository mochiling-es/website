import withRedux from 'next-redux-wrapper'
import { withRouter } from 'next/router'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import createStore from 'store/createStore'

import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import { appWithTranslation, i18n } from '../i18n'
import '../src/styles/common.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const lang = ctx.query.lang

    return {
      lang,
      pageProps: Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}
    }
  }

  componentDidMount () {
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
          <div className="Canvas js-canvas">
            <Header />
            <Component router={router} {...pageProps} />
            <Footer />
          </div>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withRouter(appWithTranslation(MyApp)))