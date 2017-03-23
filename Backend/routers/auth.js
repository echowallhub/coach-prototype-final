var express = require('express');
var bcrypt = require('bcrypt');
var Account = require('../model/account');
var router = express.Router();

/*
    Router '/auth'
 */

/**
 * @api {post} /auth/login Login
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
 * @api {post} /auth/register Register
 * @apiName Register
 * @apiGroup Authentication

 * @apiParam {String} user_name User Name
 * @apiParam {String} password Password

 * @apiSuccess {Boolean} is_success Request Success
 * @apiSuccess {String} user_id User ID created
 *
 * @apiError {Boolean} is_success Request Success
 * @apiError {String} msg Error Message
 *
 * @apiErrorExample {json} Duplicated Username (400)
 * {
 *   "is_success": false,
 *   "msg": "The user name 'test2' has already been used."
 * }
 */

router.post('/register', function(req, res) {
    var user_name = req.body.user_name;
    var password = req.body.password;
    var status, msg;

    Account.findOne({user_name: user_name}, function(error, account){
        if(error || account){
            if(error){
                status = 500;
                msg = String(error);
            } else {
                status = 400;
                msg = "The user name '" + user_name + "' has already been used."
            }
            res.status(status).send({
                is_success: false,
                msg: msg
            });
        } else {
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
        }
    })
    
});

module.exports = router;