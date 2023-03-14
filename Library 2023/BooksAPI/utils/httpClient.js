const { default: axios } = require("axios");



const get = async (url, token) => {
	return axios.get(url, {
	headers: {
	  'authorization': `${token}`
	}})
  }

  const post = async (url, body, token) => {
	try {
		const response = await axios.post(url, body, {
			headers: {
			  'Authorization': `${token}`,
			  'Content-Type':"application/json"
			}});
		const data = response.data;
		return data

	  } catch (error) {
		console.log(error);
		return null
	  }
  }

  module.exports = {post,get}