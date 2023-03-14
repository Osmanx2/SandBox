const jwt = require('jsonwebtoken');

module.exports = (req) => {
	try {
	  const token = req.headers.authorization.split(' ')[1];
	  const decodedToken = jwt.decode(token);
	  return decodedToken.id

	} catch {
	  return null
	}
  };