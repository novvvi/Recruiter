var user = require('../controllers/controllers');

module.exports = function(app){
    app.get('/user', function (req, res) {
        user.index(req, res);
    })

    app.post('/create', function (req, res) {
        user.create(req, res);
    })

    app.put('/user/edit/:id', function(req,res){
        user.update(req,res);
    })

}