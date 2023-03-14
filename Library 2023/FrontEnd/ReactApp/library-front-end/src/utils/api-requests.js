import React, { useContext } from 'react';

const postRequest = async (url, body, token)=>{
	return fetch(url, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
			},
			body: JSON.stringify(body),
		})
}

const getRequest = async (url, token)=>{
	return fetch(url, {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token,
			"Accept":"application/json"
			}
		})
}

const simpleGetRequest = async (url)=>{
	return fetch(url, {
			method: 'GET'
		})
}

export {postRequest};
export {getRequest};

export {simpleGetRequest};