const express = require('express')
const Tasks = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)

    try {
        const tsk = await task.save()
        res.status(201).send(tsk)
    } catch (e) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Tasks.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']

    const isValidOperation = updates.every(update => {
        return validUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update'})
    }
    try {
        // normal update operation
        // const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        // })

        // customized update for middleware
        const task = await Tasks.findById(req.params.id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


module.exports = router