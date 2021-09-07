const express = require('express')
const login = require(__dirname + '/controllers/login')
const register = require(__dirname + '/controllers/register')
const keyv = require(__dirname + '/controllers/KeyIv')
const encrypt = require(__dirname + '/controllers/encrypt')

const PORT = 3000

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.render('index')
})

login(app, encrypt, keyv)
register(app, encrypt, keyv)

app.listen(PORT)
console.log(`The app is running. Access localhost:${PORT}. See you there!!!`)