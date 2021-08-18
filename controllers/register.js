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

module.exports = function(app){
    app.get('/register', (req, res)=>{
        res.render('register')
    })

    app.post('/register/account', urlencodedParser, (req, res)=>{
        let newAccount = new accounts(req.body)

        accounts.find({user: req.body.user}, (err, data) => {
            if(data.length > 0){
                console.log('This account name already exists!')
            } else {
                accounts.find({email: req.body.email}, (err, data) => {
                    if (data.length > 0){
                        console.log('This account email is already being used!')
                    } else {
                        newAccount.save((err, data)=>{
                            if (err) console.log(err)
                            else console.log('Saved!')
                        })
                    }
                })
            }
        })

        res.redirect('/')
    })

}