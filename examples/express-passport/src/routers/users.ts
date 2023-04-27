import express from 'express'

const router = express.Router()

router.get('/me', (req: any, res) => {
  res.json({
    user: req.user
  })
})

export default router
