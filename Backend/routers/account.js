var express = require('express');
var bcrypt = require('bcrypt');
var Account = require('../model/account');
var router = express.Router();

/*
 Router '/account'
 */

/**
 * @api {get} /account Retrieve all User Profiles
 * @apiName GetAllAccount
 * @apiGroup Account
 *
 * @apiUse AccountSuccess
 */
router.get('/', function (req, res) {
    Account.find({}, function(error, accounts){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send(accounts)
        }
    })
});

/**
 * @api {get} /account/:id Retrieve User Profile
 * @apiName GetAccount
 * @apiGroup Account
 *
 * @apiParam {String} id User ID
 *
 * @apiUse AccountSuccess
 */
router.get('/:id', function (req, res) {
    var account_id = req.params.id;

    Account.findById(account_id, function(error, account){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            if(account){
                delete account.hashed_password;
                res.send(account)
            } else {
                res.status(404).send({
                    'msg': 'account ' + account_id + ' not found'
                })
            }

        }
    })
});

/**
 * @api {put} /account/:id Modify User Profile
 * @apiName PutAccount
 * @apiGroup Account
 *
 * @apiParam {String} id User ID
 * @apiUse AccountParam
 * @apiSuccess {String[]} enrolled_tutorial List of Enrolled Tutorial ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.put('/:id', function(req, res) {
    var account_id = req.params.id;
    var updated_account = req.body;
    
    console.log(updated_account);

    if(updated_account.password){
        var salt = bcrypt.genSaltSync(10);
        updated_account.hashed_password = bcrypt.hashSync(updated_account.password, salt)
    }

    Account.findByIdAndUpdate(account_id, updated_account, function(error){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true
            })
        }
    })
});

/**
 * @api {put} /account/:id/enroll Enroll User in tutorial
 * @apiName PutAccountEnroll
 * @apiGroup Account
 *
 * @apiParam {String} id User ID
 * @apiParam {String} tutorial_id Tutorial ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.put('/:id/enroll', function(req, res) {
    var account_id = req.params.id;
    Account.findByIdAndUpdate(account_id, {$push: {enrolled_tutorials: req.body.tutorial_id}}, function(error){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true
            })
        }
    })
});

/**
 * @api {delete} /account/:id/enroll Disenroll User in tutorial
 * @apiName DeleteAccountEnroll
 * @apiGroup Account
 *
 * @apiParam {String} id User ID
 * @apiParam {String} tutorial_id Tutorial ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.delete('/:id/enroll', function(req, res) {
    var account_id = req.params.id;
    Account.findByIdAndUpdate(account_id, {$pull: {enrolled_tutorials: req.body.tutorial_id}}, function(error){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true
            })
        }
    })
});

/**
 * @api {delete} /account/:id Delete User Profile
 * @apiName DeleteAccount
 * @apiGroup Account
 *
 * @apiParam {String} id User ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.delete('/:id', function(req, res) {
    var account_id = req.params.id;
    
    Account.findByIdAndRemove(account_id, function(error){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true
            })
        }
    })
});

module.exports = router;