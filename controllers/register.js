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

module.exports = function(app){
    app.get('/register', (req, res)=>{
        res.render('register')
    })
}