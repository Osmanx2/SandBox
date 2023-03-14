const Router = require('express-promise-router')
const db = require('../db')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const httpClient = require('../utils/httpClient')
const auth = require('../utils/authentication')

const router = new Router()


// export our router to be mounted by the parent application
module.exports = router

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('SELECT * FROM public.authors where id = $1',[id])
  res.send(rows)
})


router.get('/', async (req, res) => {
  const { rows } = await db.query('SELECT * FROM public.authors')
  res.send(rows)
})

router.post('/', async (req, res) => {
  const { name, date_of_birth, middle_name, surname, avatar, avatar_filename } = req.body

  user_id = auth(req)
  await db.pool.query("INSERT INTO public.authors (id, created_date, created_by, date_of_birth, name, middle_name, surname) VALUES( gen_random_uuid(), now(), $1, $2, $3, $4, $5) returning id", [user_id, date_of_birth, name, middle_name, surname ], (err, qres) => {
    if (err) {
      console.log(err.stack)
      res.send("Something went wrong!!!")
    } else {
      res.send({ id: qres.rows[0].id})
    }
  })
})

router.post('/update-avatar', async (req, res) => {
  const { avatarId, authorId } = req.body

  await db.pool.query("UPDATE public.authors set avatar_id = $1 where id = $2", [ avatarId, authorId ], (err, qres) => {
    if (err) {
      console.log(err.stack)
      res.send("Something went wrong!!!")
    } else {
      res.send(JSON.stringify(qres))
    }
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const { rows } = await db.query('DELETE FROM public.authors where id = $1',[id])
  res.send(rows)
})

