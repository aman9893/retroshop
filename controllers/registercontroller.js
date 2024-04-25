
var connection = require('../config/config');

module.exports.AllUaserList = function(req, res) {

    connection.query('SELECT * FROM users',  (err, results, fields) => {
        if (!err) {
            res.json({
                status: true,
                message: 'USER Data',
                data: results,
            })
        } else {
            console.log(err)
        }
    });
}

module.exports.UaserListById = function(req, res) {

    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, results, fields) => {
        if (!err) {
            res.json({
                status: true,
                message: 'USER Data',
                data: results,
            })
        } else {
            console.log(err)
        }
    });
}



module.exports.register = function(req, res) {
    var today = new Date();
    var users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "updated_at": today,
        "user_expiry_date": req.body.user_expiry_date,
        "company_name": req.body.company_name,
        "company_logo": req.body.company_logo,
        "trial_days": req.body.trial_days,
        "rolename_id": 1,
        "phone_number": req.body.phone_number,
        "shop_address": req.body.shop_address,
        "gst_num": req.body.gst_num,
        "username": req.body.name,
        "shop_type": req.body.shop_type,
    }
    connection.query('INSERT INTO users SET ?', users, function(error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                fields: fields,
                message: 'Your Shop  Registered Successfully'
            })
        }
    });
}


module.exports.upateUser = function(req, res) {
    var today = new Date();
    let id = req.body.id
    var data = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "created_at": today,
        "updated_at": today,
        "user_expiry_date": req.body.user_expiry_date,
        "company_name": req.body.company_name,
        "company_logo": req.body.company_logo,
        "trial_days": req.body.trial_days,
        "rolename_id": 1,
        "phone_number": req.body.phone_number,
        "shop_address": req.body.shop_address,
        "gst_num": req.body.gst_num,
        "username": req.body.shop_address,
        "shop_type": req.body.shop_type,
    }
    connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
                res.json({
                    status: true,
                    data: results,
                    message: 'Your Shop  Registered Info  Update  Successfully'
            })
        }
    })

}

module.exports.getUserProfile = function (req, res) {
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
        }
    });
}


