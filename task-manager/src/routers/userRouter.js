const express = require('express')
const Users = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new Users(req.body)

    try {
        const usr = await user.save()
        res.status(201).send(usr)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await Users.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['name', 'age', 'email', 'password']

    const isValidOperation = updates.every(update => {
        return validUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid Updates"})
    }
    try {
      
        // customized udate for middleware
        const user = await Users.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update] )

        await user.save()

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
        
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id)

        if(!user) {
            res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router