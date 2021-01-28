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
        res.send(user)
    } catch (e) {
        res.status(404).send(e)
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
        res.send(task)
    } catch (e) {
        res.status(404).send()
    }
})


app.listen(port, () => {
    console.log('App is running on localhost:' + port)
})