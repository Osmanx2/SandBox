const Router = require('express-promise-router')
const db = require('../db')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
module.exports = router

router.get('/', async (req, res) => {
  // callback - checkout a client
  console.log()
  db.pool.connect((err, client, done) => {
    console.log(`NODE_ENV = ${process.env.NODE_ENV}; DB host: ${process.env.PGHOST}`)
    if (err) throw err
    client.query('SELECT * FROM public.authors limit 1',(err, qres) => {
      done()
      if (err) {
        console.log(err.stack) // OO: can be handled not to show stack
      } else {
        res.send(`Books API up and running on ${process.env.NODE_ENV}!!!!`)
      }
    })
  })
})