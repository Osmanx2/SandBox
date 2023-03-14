import React, { Fragment } from "react"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
class Layout extends React.Component {
  render(){
    return (
      <Fragment>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </Fragment>
    )
  }
}
export default Layout;