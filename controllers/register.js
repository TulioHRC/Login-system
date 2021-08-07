module.exports = function(app){
    app.get('/register', (req, res)=>{
        res.render('register')
    })
}