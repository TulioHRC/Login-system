// MongoDB connection

const mongoose = require('mongoose')

const stringMongo = 'mongodb+srv://Jocker:Xn4M4GLE1Omy2Rbq@grovecluster.kna71.mongodb.net/GroveCluster?retryWrites=true&w=majority'
mongoose.connect(stringMongo, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.models = {}

let accountSchema = new mongoose.Schema({
    user: String,
    email: String,
    password: String 
})

let accounts = mongoose.model('accounts', accountSchema)

// Body parser

const bodyParser = require('body-parser')

let urlencodedParser = bodyParser.urlencoded({extended:false})

module.exports = function(app, encrypt, keyv){
    app.get('/login', (req, res)=>{
        res.render('login')
    })

    app.post('/login/account', urlencodedParser, (req, res)=>{
        accounts.find({email: req.body.email}, (err, data)=>{
            if(data.length == 0){
                console.log('The email or the password are wrong!')
                res.redirect('/login')
            } else {
                let passwordEn = encrypt(String(data[0].user), req.body.password, keyv(String(data[0].user)))
                accounts.find({email: req.body.email, password: passwordEn}, (err, data)=>{
                    if(data.length == 0){
                        console.log('The email or the password are wrong!')
                        res.redirect('/login')
                    } else {
                        console.log('Succeed!')
                        let logData = String(data).split("'")
                        res.render('account', {user: logData[1], email: logData[3]})
                    }
                })
            }
        })
        /*
        let passwordEn = encrypt(String(data.user), req.body.password, keyv(String(data.user)))
        accounts.find({email: req.body.email, password: req.body.password}, (err, data)=>{
            if(data.length == 0){
                console.log('The email or the password are wrong!')
                res.redirect('/login')
            } else {
                console.log('Succeed!')
                let logData = String(data).split("'")
                res.render('account', {user: logData[1], email: logData[3]})
            }
        })
        */
    })
}