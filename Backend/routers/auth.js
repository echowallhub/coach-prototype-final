var express = require('express');
var bcrypt = require('bcrypt');
var Account = require('../model/account');
var router = express.Router();

/*
    Router '/auth'
 */

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Authentication

 * @apiParam {String} user_name User Name
 * @apiParam {String} password Password

 * @apiSuccess {Boolean} is_success Request Success
 * @apiSuccess {Object} account_info Current User Info
 * @apiUse AccountSuccessAccountInfo
 * 
 */
router.post('/login', function (req, res) {
    var user_name = req.body.user_name;
    var password = req.body.password;

    Account.findOne({user_name: user_name}, function(error, account){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            if(bcrypt.compareSync(password, account.hashed_password)){
                res.send({
                    is_success: true,
                    account_info: account
                });
            } else {
                res.send({
                    is_success: false,
                    msg: 'Password incorrect.'
                });
            }
        }
    })
});

/**
 * @api {post} /register Register
 * @apiName Register
 * @apiGroup Authentication

 * @apiParam {String} user_name User Name
 * @apiParam {String} password Password

 * @apiSuccess {Boolean} is_success Request Success
 */

router.post('/register', function(req, res) {
    var user_name = req.body.user_name;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);

    var new_user = new Account({
        user_name: user_name,
        hashed_password: bcrypt.hashSync(password, salt),
        role: Account.ROLES.USER
    });

    new_user.save(function(error, data){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true,
                user_id: data._id
            })
        }
    });
});

module.exports = router;