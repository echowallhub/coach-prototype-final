var mongoose = require('mongoose');
var uuid = require('node-uuid');

/**
 * @apiDefine TutorialParam
 * @apiParam {String} name Name
 * @apiParam {String} description Description
 * @apiParam {Object} tutor Tutor ID
 * @apiParam {String} category Category
 */

/**
 * @apiDefine TutorialSuccess
 * @apiSuccess {String} name Name
 * @apiSuccess {String} description Description
 * @apiSuccess {Object} tutor Tutor ID
 * @apiSuccess {String} category Category
 * @apiSuccess {Object[]} videos Videos in the Tutorial
 * @apiSuccess {Object} metadata Tutorial Metadata
 * @apiSuccess {Object} metadata.create_time Tutorial Create Time
 * @apiSuccess {Object} metadata.update_time Tutorial Update TIme
 */

var TutorialSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4},
    name: String,
    description: String,
    tutor: {type: String, ref: 'Account'},
    category: String,
    videos: [{type: String, ref: 'Video'}],
    meta:{
        create_time: Date,
        update_time: Date
    }
});

var TutorialModel = mongoose.model('Tutorial', TutorialSchema);

module.exports = TutorialModel;