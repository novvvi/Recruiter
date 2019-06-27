var user = require('../controllers/controllers');

module.exports = function(app){
    app.get('/user', function (req, res) {
        user.index(req, res);
    })

    app.post('/create', function (req, res) {
        user.create(req, res);
    })

    app.get('/user/:id', (req, res) => {
        user.show(req, res);
    })

    app.put('/user/edit/:id', function(req,res){
        user.update(req,res);
    })

    app.delete('/destroy/user/:id', (req, res) => {
        user.destroy(req, res)
    })

}