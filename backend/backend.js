import express from 'express'
import cors from 'cors'

const app = express()

let state = {}

app.use(cors())

app.post('/' , (req, res) => {
    console.log(res.body)
    res.send('hello')        
})

app.get('/', (req, res) => {

})

export {
    app as app
}