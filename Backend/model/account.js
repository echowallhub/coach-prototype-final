var mongoose = require('mongoose');
var uuid = require('node-uuid');

/**
 * @apiDefine AccountParam
 * @apiParam {String} email Email
 * @apiParam {String} name Name
 * @apiParam {String} role Role
 * @apiParam {String} password Password
 */

/**
 * @apiDefine AccountSuccess
 * @apiSuccess {String} user_name User Name
 * @apiSuccess {String} email Email
 * @apiSuccess {String} name Name
 * @apiSuccess {String} role Role
 * @apiSuccess {Object[]} enrolled_tutorial List of Enrolled Tutorial
 * @apiSuccess {Object} metadata User Profile Metadata
 * @apiSuccess {Date} metadata.create_time Account Create Time
 * @apiSuccess {Date} metadata.update_time Account Update Time
 * @apiSuccess {Date} metadata.last_login_time Account Last Login Time
 */

/**
 * @apiDefine AccountSuccessAccountInfo
 * @apiSuccess {String} account_info.user_name User Name
 * @apiSuccess {String} account_info.email Email
 * @apiSuccess {String} account_info.name Name
 * @apiSuccess {String} account_info.role Role
 * @apiSuccess {Object[]} account_info.enrolled_tutorial List of Enrolled Tutorial
 * @apiSuccess {Object} account_info.metadata User Profile Metadata
 * @apiSuccess {Date} account_info.metadata.create_time Account Create Time
 * @apiSuccess {Date} account_info.metadata.update_time Account Update Time
 * @apiSuccess {Date} account_info.metadata.last_login_time Account Last Login Time
 */

var AccountRoles = {
    USER: 'user',
    COACH: 'coach',
    ADMIN: 'admin'
};

var AccountSchema = new mongoose.Schema({
    _id: {type: String, default: uuid.v4},
    user_name: {type: String, unique: true, required: true, index:true},
    email: String,
    hashed_password: {type: String, required: true},
    name: String,
    role: String,
    enrolled_tutorials: [{type: String, ref: 'Tutorial'}],
    metadata: {
        create_time: Date,
        update_time: Date,
        last_login_time: Date
    }
});

AccountSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.hashed_password;
        return ret;
    }
});

var AccountModel = mongoose.model('Account', AccountSchema);
AccountModel.ROLES = AccountRoles;

module.exports = AccountModel;