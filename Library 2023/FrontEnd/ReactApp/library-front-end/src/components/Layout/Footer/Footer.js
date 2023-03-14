import React, { Fragment } from "react";
import Helmet from "react-helmet";
class Footer extends React.Component {
  render() {
    return(
		<Fragment>
		<footer className="main-footer">
			<div className="float-right d-none d-sm-block">
			<b>Version</b> 2022
			</div>
			<strong>Copyright &copy; Feb 2022 <a href="/">Home</a>.</strong> 
		</footer>
		<Helmet>
			<script type="text/jsx" src="./assets/plugins/jquery/jquery.min.js"></script>
			<script type="text/jsx" src="./assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
			<script type="text/jsx" src="./assets/js/adminlte.min.js"></script>
			<script type="text/jsx" src="./assets/js/demo.js"></script>
		</Helmet>
		</Fragment>
    );
  }
}
export default Footer;