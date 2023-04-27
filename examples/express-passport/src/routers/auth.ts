import express from 'express'
import passport from 'passport'
import { PasscardMessage, fromSanitizedMessage, generateNonce, parseSignature } from '@passcard/auth'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

passport.serializeUser((user, cb) => {
  console.log('>>>SERIALIZE', user)
  process.nextTick(() => {
    cb(null, { id: user.address, username: user.address })
  })
})

passport.deserializeUser((user, cb) => {
  console.log('>>>DESERIALIZE', user)
  process.nextTick(() => cb(null, user))
})

const router = express.Router()

router.post('/login/message', (req, res) => {
  const { message } = new PasscardMessage({
    domain: 'localhost',
    address: req.body.address,
    blockchain: req.body.blockchain,
    statement: 'Sign in',
    version: '0.0.1',
    uri: 'http://localhost:3000',
    networkId: 0,
    nonce: generateNonce()
  })
  res.json({ message })
})

// username: cardfeed.netlify.app wants you to sign data with your Cardano address:\naddr_test1qqnxqn6ctswuh8pucv36fvg25yw63fh3sseqjtxzu5h6sq5fhtl8hrk3sxzxjh8xtdts2ds4gyt4qxlw6n4t27fka5dqmlmm2g\n\nSign in\n\nMeta:\nVersion: 0.0.1\nURI: http://localhost:3000/\nNetwork ID: 0\nNonce: a997ffa0faf4945781b14075d2a8c1e7b47562058f0bfd7fcb044a4ef923f63b
// password: {"payload":{"signature":"845846a20127676164647265737358390026604f585c1dcb9c3cc323a4b10aa11da8a6f18432092cc2e52fa80289bafe7b8ed18184695ce65b570536154117501beed4eab57936ed1aa166686173686564f459014463617264666565642e6e65746c6966792e6170702077616e747320796f7520746f207369676e2064617461207769746820796f75722043617264616e6f20616464726573733a0a616464725f746573743171716e78716e3663747377756838707563763336667667323579773633666833737365716a74787a753568367371356668746c3868726b3373787a786a68387874647473326473346779743471786c77366e34743237666b613564716d6c6d6d32670a0a5369676e20696e0a0a4d6574613a0a56657273696f6e3a20302e302e310a5552493a20687474703a2f2f6c6f63616c686f73743a333030302f0a4e6574776f726b2049443a20300a4e6f6e63653a206139393766666130666166343934353738316231343037356432613863316537623437353632303538663062666437666362303434613465663932336636336258408992b04d764e88cc97d26ee11cf1ff032857b4234fad666dec264e67a79739d03e3c694d79790b1b2a3390add20a2d2d8fdeecf87c491256925be0178bec9d0e","key":"a4010103272006215820a54d960fbcff736a0f7dc6792c718369b91ef7bec2b206eeb3cb8e711abec432"},"address":"0026604f585c1dcb9c3cc323a4b10aa11da8a6f18432092cc2e52fa80289bafe7b8ed18184695ce65b570536154117501beed4eab57936ed1a","parsedMessage":"63617264666565642e6e65746c6966792e6170702077616e747320796f7520746f207369676e2064617461207769746820796f75722043617264616e6f20616464726573733a0a616464725f746573743171716e78716e3663747377756838707563763336667667323579773633666833737365716a74787a753568367371356668746c3868726b3373787a786a68387874647473326473346779743471786c77366e34743237666b613564716d6c6d6d32670a0a5369676e20696e0a0a4d6574613a0a56657273696f6e3a20302e302e310a5552493a20687474703a2f2f6c6f63616c686f73743a333030302f0a4e6574776f726b2049443a20300a4e6f6e63653a2061393937666661306661663439343537383162313430373564326138633165376234373536323035386630626664376663623034346134656639323366363362"}
router.post('/login/passcard', (req, res, next) => {
  passport.authenticate('passcard', {}, async (err) => {
    if (err) {
      console.log(err)
    }
    const signature = parseSignature(req.body.password)
    const message = fromSanitizedMessage(req.body.username)
    const isValid = await message.verify({
      signature: signature
    })
    if (!isValid) res.status(500).json({ error: 'Invalid signature' })
    const address = message.getAddress()
    const user = await prisma.user.upsert({ where: { address }, update: { address }, create: { address } })
    const token = jwt.sign({ address }, process.env.JWT_SECRET)
    res.status(200).send({
      user,
      token
    })
  })(req, res, next)
})

export default router
