var express = require('express');
var uuid = require('node-uuid');
var multer = require('multer');
var ffmpeg = require('ffmpeg');
var path = require("path");
var Video = require('../model/video');
var Tutorial = require('../model/tutorial');
var router = express.Router();

/*
    File Upload settings
 */

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/')
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

/*
 Router '/video'
 */

/**
 * @api {post} /video Upload a Video
 * @apiName PostVideo
 * @apiGroup Video
 *
 * @apiUse VideoParam
 * @apiParam {Object} file File Object
 * @apiParam {String} tutorial_id Tutorial ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 * @apiSuccess {String} video_id ID of Video created
 */
router.post('/', upload.any(), function (req, res) {
    try {
        var process = new ffmpeg(req.files[0].path);
        process.then(function create_video(video) {
            var new_video = new Video({
                name: req.body.name,
                description: req.body.description,
                url: req.files[0].path,
                length_seconds: video.metadata.duration.seconds
            });

            new_video.save(function(error, data){
                if(error){
                    res.status(500).send({
                        is_success: false,
                        msg: String(error)
                    });
                } else {
                    Tutorial.findByIdAndUpdate(req.body.tutorial_id, {$push: {videos: data._id}}, function (error){
                        if(error){
                            res.status(500).send({
                                is_success: false,
                                msg: String(error)
                            });
                        }
                        res.send({
                            is_success: true,
                            video_id: data._id
                        }) 
                    });
                }
            });

        }, function (err) {
            res.status(500).send({msg: err});
        });
    } catch (e) {
        res.status(500).send({msg: e.code + ':' + e.msg});
    }
});

/**
 * @api {get} /video/:id Retrieve Video Info
 * @apiName GetVideo
 * @apiGroup Video
 *
 * @apiParam {String} id Video ID
 *
 * @apiUse VideoSuccess
 */
router.get('/:id', function (req, res) {
    var video_id = req.params.id;
    
    Video.findById(video_id, function(error, video){
        if(error){
            res.status(500).send({
                is_success: false,
                msg: String(error)
            });
        } else {
            if(video){
                res.send(video)
            } else {
                res.status(404).send({
                    'msg': 'video ' + video_id + ' not found'
                })
            }

        }
    })
});

/**
 * @api {put} /video/:id Update Video Info
 * @apiName PutVideo
 * @apiGroup Video
 *
 * @apiParam {String} id Video ID
 * @apiUse VideoParam
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.put('/:id', function (req, res) {
    var video_id = req.params.id;
    var updated_video = req.body;

    Video.findByIdAndUpdate(video_id, updated_video, function(error){
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
 * @api {put} /video/:id/viewed Increment Video View Count
 * @apiName PutVideoView
 * @apiGroup Video
 *
 * @apiParam {String} id Video ID
 * @apiUse VideoParam
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.put('/:id/viewed', function (req, res) {
    var video_id = req.params.id;
    
    Video.findByIdAndUpdate(video_id, {$inc: {view_count:1}}, function(error){
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
 * @api {delete} /video/:id Delete Video
 * @apiName DeleteVideo
 * @apiGroup Video
 *
 * @apiParam {String} id Video ID
 *
 * @apiSuccess {Boolean} is_success Request Success
 */
router.delete('/:id', function (req, res) {
    var video_id = req.params.id;

    Video.findByIdAndRemove(video_id, function(error){
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