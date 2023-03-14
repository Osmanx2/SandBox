
import React from 'react';

import Sidebar from "../components/Sidebar/Sidebar";

const ProfilePage = () => {
  return (
    <div className="wrapper">
    <Sidebar/>
  <div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Create Book</h3>
  </div>
  <form role="form">
    <div className="card-body">
      <div className="form-group">
        <label for="exampleInputEmail1">Address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <div className="form-group">
        <label for="exampleInputFile">File input</label>
        <div className="input-group">
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="exampleInputFile"/>
            <label className="custom-file-label" for="exampleInputFile">Choose file</label>
          </div>
          <div className="input-group-append">
            <span className="input-group-text" id="">Upload</span>
          </div>
        </div>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
    </div>

    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>
</div>);
};

export default ProfilePage;