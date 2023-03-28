import React, {useRef, useContext} from "react";
import { useNavigate  } from 'react-router-dom';

import Sidebar from "../components/Sidebar/Sidebar";
import { postRequest } from "../utils/api-requests"
import AuthContext from '../store/auth-context';
import getBase64 from "../utils/file";
import BooksTable from "../components/Book/BooksTable/BooksTable";
import BookForm from "../components/Book/BookForm";

const BookDetailPage = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="col-md-6">
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1></h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Layout</a>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <BookForm/>
        <BooksTable/>
      </div>
      
      </div>
    </div>
  );
};

export default BookDetailPage;