import '../../../assets/css/adminlte.css'
import React, {useContext, useState, useEffect} from "react"
import AuthContext from '../../../store/auth-context';
import { getRequest } from "../../../utils/api-requests";
import FileLoader from "../../Files/PictureLoader"
function BooksTable(props){
  const authCtx = useContext(AuthContext);

  const [authors, setAuthors] = useState(null);


	const getAuthors = ()=>{
		getRequest("/books-api/books",authCtx.token)
    .then((res) => {
			if (res.ok) {
			  return res.json();
			} else {
			  return res.json().then((data) => {
				let errorMessage = 'Error creating book!';
				throw new Error(errorMessage);
			  });
			}
		  })
		  .then((data) => {
      setAuthors(data)
      console.log(JSON.stringify(data))
		  })
		  .catch((err) => {
			console.log("Catched error")
			alert(err.message);
		  });
	}

  // Just load it once not in each render
  useEffect(()=>{
    getAuthors();
  },[]);

	return (
		<div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Responsive Hover Table</h3>

                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{width: '150px'}}>
                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search"/>

                    <div className="input-group-append">
                      <button type="submit" className="btn btn-default"><i className="fas fa-search"></i></button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body table-responsive p-0">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Cover</th>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Cost</th>
                      <th>Date Published</th>
                      <th>Authors</th>
                    </tr>
                  </thead>
                  <tbody>
                  {!authors && <tr><td>Data is loading!</td></tr>}
                    {/* {authors && authors.map(item => (
                    <tr key={item.id}><td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.middle_name}</td>
                      <td>{item.surname}</td>
                      <td><FileLoader imageId={item.avatar_id}></FileLoader></td>
                    </tr>
                     ))} */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
	)
}

export default BooksTable;