var mongoose = require('mongoose');
var uuid = require('node-uuid');

/**
 * @apiDefine VideoParam
 * @apiParam {String} name Name
 * @apiParam {String} description Description
 */

/**
 * @apiDefine VideoSuccess
 * @apiSuccess {String} name Name
 * @apiSuccess {String} description Description
 * @apiSuccess {String} url URL of the Video 
 * @apiSuccess {Number} view_count Number of View
 * @apiSuccess {Number} length_seconds Length of Video in seconds
 * @apiSuccess {Object} metadata Video Metadata
 * @apiSuccess {Object} metadata.create_time Video Create Time
 * @apiSuccess {Object} metadata.update_time Video Update TIme
 */

var VideoSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4},
    name: String,
    description: String,
    url: String,
    view_count: {type: Number, default: 0},
    length_seconds: Number,
    preview_frames_url: [String],
    meta:{
        create_date: Date,
        update_date: Date
    }
});

var VideoModel = mongoose.model('Video', VideoSchema);

module.exports = VideoModel;
