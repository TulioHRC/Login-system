const express = require('express')
const login = require(__dirname + '/controllers/login')
const register = require(__dirname + '/controllers/register')

const PORT = 3000

let app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=>{
    res.render('index')
})

login(app)
register(app)

app.listen(PORT)
console.log(`The app is running. Access localhost:${PORT}. See you there!!!`)