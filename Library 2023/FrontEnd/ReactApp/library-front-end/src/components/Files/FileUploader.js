




import React, {useRef, useContext, useState } from "react";

import AuthContext from '../../store/auth-context';

const FileUploader = ({fileSucessHandler, onFileSelectError}) => {
  const avatarRef = useRef();
  
  const authCtx = useContext(AuthContext);

  const [authors, setAuthors] = useState(null);

  const fileChanged = () => {

      // handle validations
      const file = avatarRef.files[0];
      if (file.size > 1024)
        onFileSelectError({ error: "File size cannot exceed more than 1MB" });
      else fileSucessHandler(file);
  };

  return (<div className="form-group">
                      <label for="exampleInputFile">Avatar</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                            onChange={fileChanged}
                            ref={avatarRef}
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