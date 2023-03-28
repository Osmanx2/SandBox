const Router = require('express-promise-router')
const db = require('../db')
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()
// export our router to be mounted by the parent application
module.exports = router

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM public.books where id = $1',[id])
  res.send(rows)
})

router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM public.books')
  res.send(rows)
})

router.post('/', async (req, res) => {
  const { date_published, title, description, cost } = req.body

  user_id = auth(req)
  await db.pool.query("INSERT INTO public.books (id, created_date, created_by, date_of_birth, name, middle_name, surname) VALUES( gen_random_uuid(), now(), $1, $2, $3, $4, $5) returning id", [user_id, date_of_birth, name, middle_name, surname ], (err, qres) => {
    if (err) {
      console.log(err.stack)
      res.send("Something went wrong!!!")
    } else {
      res.send(JSON.stringify(qres.rows[0].id))
    }
  })
})


//OO: just for tests
router.post('/', async (req, res) => {
  res.send( req.body )
})