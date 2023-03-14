import React, {useRef, useContext, useState, useEffect } from "react";

import AuthContext from '../../store/auth-context';

import { getRequest } from "../../utils/api-requests";
const PictureLoader = (props) => {
  const authCtx = useContext(AuthContext);

  const [imageData, setImageData] = useState(null);

  const getImageData = ()=>{
	getRequest(`/documents-api/files/${props.imageId}`,authCtx.token)
	.then((res) => {
		if (res.ok) {
		  return res.json();
		} else {
		  return res.json().then((data) => {
			let errorMessage = 'Error in getting image!';
			throw new Error(errorMessage);
		  });
		}
	  })
	.then((data) => {
  		setImageData(data)
		console.log()
	  })
	.catch((err) => {
		console.log("Catched error")
		alert(err.message);
	  });
}

//<img className="attachment-img" src={`data:image/jpeg;base64,${imageData}`} alt="Attachment Image"></img> 
// Just load it once not in each render
useEffect(  ()=>{
	if( props.imageId ) 
		getImageData();
},[]);


  return ( <div> 
	  { !imageData && <p>No image</p> }
	  {  imageData && imageData.length > 0 && <img className="attachment-img" style={{width: 50, height: 50}} src={`data:image/jpeg;base64,${imageData[0].content}`} alt="Attachment Image"></img>}
	  </div>)
  
};

export default PictureLoader;