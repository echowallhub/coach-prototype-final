var express = require('express');
var mongoose = require('mongoose');
var Tutorial = require('../model/tutorial');
var router = express.Router();

/*
 Router '/tutorial'
 */

/**
 * @api {get} /tutorial Retrieve all Tutorials
 * @apiName GetAllTutorial
 * @apiGroup Tutorial
 *
 * @apiUse TutorialSuccess
 */
router.get('/', function (req, res) {
    Tutorial.find({})
        .populate('tutor')
        .populate('videos')
        .exec(function(error, tutorial){
            if(error){
                res.status(500).send({
                    is_success: false,
                    msg: String(error)
                });
            } else {
                res.send(tutorial)
            }
        })
});

/**
 * @api {post} /tutorial Create a Tutorial
 * @apiName PostTutorial
 * @apiGroup Tutorial
 *
 * @apiUse TutorialParam
 *
 * @apiSuccess {Boolean} is_success Request Success
 * @apiSuccess {String} tutorial_id ID of Tutorial created
 */
router.post('/', function (req, res) {
    var new_tutorial = new Tutorial(req.body);
    new_tutorial.save(function(error, data){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            res.send({
                is_success: true,
                tutorial_id: data._id
            })
        }
    });
});

/**
 * @api {get} /tutorial/:id Retrieve Tutorial Info
 * @apiName GetTutorial
 * @apiGroup Tutorial
 *
 * @apiParam {String} id Tutorial ID
 *
 * @apiUse TutorialSuccess
 */
router.get('/:id', function (req, res) {
    var tutorial_id = req.params.id;

    Tutorial.findOne({_id: tutorial_id})
        .populate('tutor', 'videos')
        .exec(function(error, tutorial){
            if(error){
                res.status(500).send({
                    is_success: false,
                    msg: String(error)
                });
            } else {
                if(tutorial){
                    console.log(typeof tutorial._id);
                    res.send(tutorial)
                } else {
                    res.status(404).send({
                        'msg': 'tutorial ' + tutorial_id + ' not found'
                    })
                }

            }
        })
});

/**
 * @api {put} /tutorial/:id Update Tutorial Info
 * @apiName PutTutorial
 * @apiGroup Tutorial
 *
 * @apiParam {String} id Tutorial ID
 * @apiUse TutorialParam
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.put('/:id', function (req, res) {
    var tutorial_id = req.params.id;
    var updated_tutorial = req.body;

    Tutorial.findByIdAndUpdate(tutorial_id, updated_tutorial, function(error){
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
 * @api {delete} /tutorial/:id Delete Tutorial
 * @apiName DeleteTutorial
 * @apiGroup Tutorial
 *
 * @apiParam {String} id Tutorial ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.delete('/:id', function (req, res) {
    var tutorial_id = req.params.id;

    Tutorial.findByIdAndRemove(tutorial_id, function(error){
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