const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/userRouter')
const taskRouter = require('./routers/taskRouter')



const app = express()
const port = process.env.port || 3000;
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('App is running on localhost:' + port)
})


// const bcrypt = require('bcryptjs')

// const hashFun = async () => {
//     const password = 'Hello123'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     const isMatch = await bcrypt.compare('Hello123', hashedPassword)
//     console.log(password)
//     console.log(hashedPassword)
//     console.log(isMatch)
// }

// hashFun()