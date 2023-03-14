// ./routes/index.js
const books = require('./books')
const author = require('./authors')
const health = require('./health')


module.exports = app => {
  app.use('/books', books)
  app.use('/authors', author)
  app.use('/health', health)
}

