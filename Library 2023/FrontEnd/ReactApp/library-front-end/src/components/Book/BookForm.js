import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utils/api-requests";
import AuthContext from "../../store/auth-context";
import getBase64 from "../../utils/file";
import FileUploader from "../Files/FileUploader";
import { simpleGetRequest } from "../../utils/api-requests";

const BookForm = () => {
	const titleRef = useRef();
	const descriptionRef = useRef();
	const costRef = useRef();
	const dateIssuedRef = useRef();
	const bookCoverRef = useRef();
  const publisherRef = useRef();
	let bookCoverBase64 = null;
	let bookCoverFileName = "";

	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);

	const setSelectedFile = (file) => {
		bookCoverFileName = file.Name;

		getBase64(file, (res) => {
			bookCoverBase64 = res;
		});
	};
	const submitHandler = (event) => {
		event.preventDefault();

		const title = titleRef.current.value;
		const cost = costRef.current.value;
		const description = descriptionRef.current.value;
		const dateOfPublish = dateIssuedRef.current.value;
		const cover = bookCoverRef.current.value;
    const publisher = publisherRef.current.value;

		postRequest(
			"/books-api/books",
			{
				title: title,
				description: description,
				cost: cost,
				dateOfPublish: dateOfPublish,
        publisher: publisher
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
				console.log("Author saved with ID: " + data.id);
			})
			.catch((err) => {
				console.log("Catched error");
				alert(err.message);
			});
	};

	const [healtyAPI, setDocumentsAPIhealth] = useState(false);

	const checkDocumentApi = () => {
		simpleGetRequest("/documents-api/health")
			.then((res) => {
				if (res.ok) {
					setDocumentsAPIhealth(true);
					console.log("Documents API working...");
				} else {
					setDocumentsAPIhealth(false);
					console.log("Documents API is not up...");
				}
			})
			.catch((err) => {
				console.log("Documents API is not up...");
				setDocumentsAPIhealth(false);
				alert(err.message);
			});
	};

	checkDocumentApi();

	return (
		<section className="content">
			<div className="container-fluid">
				<div className="row">
					<div className="col-12">
						<div className="card-body">
							<div className="card card-primary">
								<div className="card-header">
									<h3 className="card-title">Create Book</h3>
								</div>
								<form onSubmit={submitHandler} role="form">
									<div className="card-body">
										<div className="form-group">
											<label for="exampleInputEmail1">Title</label>
											<input
												type="text"
												className="form-control"
												id="exampleInputEmail1"
												placeholder="Title"
												ref={titleRef}
											/>
										</div>
										<div className="form-group">
											<label for="description">Description</label>
											<input
												type="text"
												className="form-control"
												id="description"
												placeholder="Description"
												ref={descriptionRef}
											/>
										</div>
										<div className="form-group">
											<label for="cost">Cost</label>
											<input
												type="text"
												className="form-control"
												id="cost"
												placeholder="Cost"
												ref={costRef}
											/>
										</div>
                    <div className="form-group">
											<label for="publisher">Publisher</label>
											<input
												type="text"
												className="form-control"
												id="publisher"
												placeholder="Publisher"
												ref={publisherRef}
											/>
										</div>
										<div class="form-group">
											<label>Date of publishing:</label>
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
													ref={dateIssuedRef}
												/>
											</div>
										</div>
										{healtyAPI ? (
											<FileUploader uploaderTitle="Cover"
												onFileSelectSuccess={(file) => setSelectedFile(file)}
												onFileSelectError={({ error }) => alert(error)}
											/>
										) : (
											<p>Document upload is not available....</p>
										)}
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

export default BookForm;
