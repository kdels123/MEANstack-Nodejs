module.exports = function (app) {
    app.post('/api/user', createUser);
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/profile/', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.put('/api/user', updateUser);

    var userModel = require('../models/user/user.model.server');

    function createUser(req, res) {
        var user = req.body;
        userModel.findByUsername(user.username).then(function(username) {
            if (!username) {
                userModel.createUser(user)
                    .then(function (user) {
                        req.session['currentUser'] = user;
                        res.send(user);
                    });
            }
            else {
                res.send(500);
            }})
}

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function login(req, res) {
        var credentials = req.body;
        userModel.findByUsernameAndPassword(credentials).then(function(potUser) {
            if(potUser.length > 0) {
                userModel.findUserByCredentials(credentials)
                    .then(function (user) {
                    req.session['currentUser'] = user;
                    delete user.password;
                    res.json(user);
                })
            } else {
                res.send(500);
            }})
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        userModel.updateUser(user).then(function (user) {
            req.session['currentUser'] = user;
            res.send(user)
        })
    }

}