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
        if (user) {
            userModel.createUser(user)
                .then(function (user) {
                    req.session['currentUser'] = user;
                    res.send(user);
                })
        } else {
            res.errorCallback();
        }
    }

//     function createUser(req, res) {
//         var user = req.body;
//         userModel.findUserByCredentials(user.username, function (err, count) {
//         if (!count) {
//             userModel.createUser(user)
//                 .then(function (user) {
//                     req.session['currentUser'] = user;
//                     res.send(user);
//                 });
//             console.log("Inserting " + user.username);
//             // return userModel.create(user)
//         }
//         else {
//             res.send(0);
//             console.log('Already Exists');
//         }
//     });
// }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }

    function login(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials).then(function(user) {
            req.session['currentUser'] = user;
            delete user.password;
            res.json(user);
        })
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