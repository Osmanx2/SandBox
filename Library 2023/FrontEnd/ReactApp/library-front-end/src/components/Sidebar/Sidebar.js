import React from 'react';
import logo from '../../assets/img/AdminLTELogo.png'; 
import avatar from '../../assets/img/avatar3.png'; 
function Sidebar(props){

	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">

		<a href="index3.html" className="brand-link">
		  <img src={logo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"/>
		  <span className="brand-text font-weight-light">Library of VUM</span>
		</a>
<div className="sidebar">
      {/* <!-- Sidebar user (optional) --> */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src={avatar} className="img-circle elevation-2" alt="User Image"/>
        </div>
        <div className="info">
          <a href="#" className="d-block">Osman Osman</a>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
          <li className="nav-item">
                <a href="./dashboard" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Dashboard</p>
                </a>
          </li>
          <li className="nav-item">
                <a href="./books" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Books</p>
                </a>
          </li>
          <li className="nav-item">
                <a href="./authors" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Authors</p>
                </a>
          </li>
        </ul>
      </nav>
      {/* <!-- /.sidebar-menu --> */}
    </div>
	</aside>
	)
}

export default Sidebar;
