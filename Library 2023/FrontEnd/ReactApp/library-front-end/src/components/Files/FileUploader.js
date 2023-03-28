




import React, {useRef, useContext, useState } from "react";

import AuthContext from '../../store/auth-context';

const FileUploader = ({fileSucessHandler, onFileSelectError, uploaderTitle}) => {
  const avatarRef = useRef();
  
  const authCtx = useContext(AuthContext);

  const [authors, setAuthors] = useState(null);

  function fileChanged(e) {
    // handle validations
    const files = Array.from(e.target.files);
    console.log(files);
    if (files[0].size > 1024*1000)
      onFileSelectError({ error: "File size cannot exceed more than 1MB" });
    else
      fileSucessHandler(files[0]);
  }

  return (<div className="form-group">
                      <label for="exampleInputFile">{uploaderTitle}</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                            onChange={fileChanged}
                          />
                          <label
                            className="custom-file-label"
                            for="exampleInputFile"
                          >
                            Choose file
                          </label>
                        </div>
                        <div className="input-group-append">
                          <span className="input-group-text" id="">
                            Upload
                          </span>
                        </div>
                      </div>
                    </div>
  );
};

export default FileUploader;