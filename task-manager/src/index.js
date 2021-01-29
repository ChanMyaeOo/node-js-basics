const express = require('express')
require('./db/mongoose')
const Users = require('./models/user')
const Tasks = require('./models/task')

const app = express()
app.use(express.json())
const port = process.env.port || 3000;

app.post('/users', async (req, res) => {
    const user = new Users(req.body)

    try {
        const usr = await user.save()
        res.status(201).send(usr)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['name', 'age', 'email', 'password']

    const isValidOperation = updates.every(update => {
        return validUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid Updates"})
    }
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
        
    } catch (e) {
        res.status(500).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
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

app.post('/tasks', async (req, res) => {
    const task = new Tasks(req.body)

    try {
        const tsk = await task.save()
        res.status(201).send(tsk)
    } catch (e) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Tasks.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(error)
    }
})

app.get('/tasks/:id', async (req, res) => {
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

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']

    const isValidOperation = updates.every(update => {
        return validUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Update'})
    }
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('App is running on localhost:' + port)
})