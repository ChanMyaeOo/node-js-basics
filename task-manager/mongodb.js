const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

// const { MongoClient, ObjectID } = require('mongodb')

const url = 'mongodb://localhost:27017';

const dbName = 'task-manager';

const id = new ObjectID()

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    if(err) {
        return console.log('Unable to connect database')
    }

    console.log('Connected to database')

    const db = client.db(dbName)

    console.log(id.getTimestamp())

    // db.collection('users').insertOne({
    //     name: 'chan',
    //     age: 30
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Peter',
    //         age: 22
    //     },
    //     {
    //         name: 'Celi',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Read Books',
    //         completed: false
    //     },
    //     {
    //         description: 'Train Dota2',
    //         completed: false
    //     },
    //     {
    //         description: 'Learn Guitar',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert documents')
    //     }
    //     console.log(result.ops)
    // })

    // client.close()
})