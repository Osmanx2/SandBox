import React, {useRef, useContext, useState} from "react";
import { useNavigate  } from 'react-router-dom';
import { postRequest, simpleGetRequest } from "../../utils/api-requests"
import AuthContext from '../../store/auth-context';
import getBase64 from "../../utils/file";
import FileUploader from "../Files/FileUploader";

const AuthorsForm = () => {
  const nameRef = useRef();
  const midNameRef = useRef();
  const familyNameRef = useRef();
  const dateOfBirthRef = useRef();
  const avatarRef = useRef();
  let avatarBase64 = null;
  let avatarFileName = "";

  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const setSelectedFile = (file) => {
    avatarFileName = file.Name;

    getBase64(file, (res) => {
      avatarBase64 = res;
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const name = nameRef.current.value;
    const familyName = familyNameRef.current.value;
    const midName = midNameRef.current.value;
    const dateOfBirth = dateOfBirthRef.current.value;
    const avatar = avatarRef.current.value;

    console.log(
      JSON.stringify({
        name: name,
        midddle_name: midName,
        avatar: avatarBase64,
        date_of_birth: dateOfBirth,
        surname: familyName,
        avatar_filename: avatarFileName,
      })
    );

    postRequest(
      "/books-api/authors",
      {
        name: name,
        middle_name: midName,
        avatar: avatarBase64,
        date_of_birth: dateOfBirth,
        surname: familyName,
        avatar_filename: avatarFileName,
      },
      authCtx.token
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Error creating book!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("Author saved with ID: "+ data.id)
      })
      .catch((err) => {
        console.log("Catched error");
        alert(err.message);
      });
  };

  const [healtyAPI, setDocumentsAPIhealth]  = useState(false)

	const checkDocumentApi = ()=>{
		simpleGetRequest("/documents-api/health")
    .then((res) => {
			if (res.ok) {
			  setDocumentsAPIhealth( true )
        console.log("Documents API working...")
			} else {
			  setDocumentsAPIhealth( false )
        console.log("Documents API is not up...")
			}
		  })
		  .catch((err) => {
			console.log("Documents API is not up...")
      setDocumentsAPIhealth( false )
			alert(err.message);
		  });
	}

  checkDocumentApi();

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card-body">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Create Author</h3>
                </div>
                <form onSubmit={submitHandler} role="form">
                  <div className="card-body">
                    <div className="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Name"
                        ref={nameRef}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Middle Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Middle Name"
                        ref={midNameRef}
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Family Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Family Name"
                        ref={familyNameRef}
                      />
                    </div>
                    <div class="form-group">
                      <label>Date of birth:</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">
                            <i class="far fa-calendar-alt"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          data-inputmask-alias="datetime"
                          data-inputmask-inputformat="dd/mm/yyyy"
                          data-mask
                          ref={dateOfBirthRef}
                        />
                      </div>
                    </div>
                    { healtyAPI ? <FileUploader  uploaderTitle="Avatar" onFileSelectSuccess={(file) => setSelectedFile(file)} onFileSelectError={({ error }) => alert(error)}/> : <p>Document upload is not available....</p> }
                  </div>

                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorsForm;
