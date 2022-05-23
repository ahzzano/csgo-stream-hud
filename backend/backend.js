import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

let state = {}

app.use(cors())
app.use(bodyParser.json())

app.post('/' , (req, res) => {
    console.log(req.body)
    res.send('hello')        
})

app.get('/', (req, res) => {

})

export {
    app as app
}