var connection = require('../config/config');
var jwt = require('jsonwebtoken');

module.exports.khatabookList = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    console.log(userid)
    connection.query('SELECT * FROM khatabook WHERE user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.end(JSON.stringify(result));
    })
}
/////////////////////////////////////////////////////////
module.exports.addKhataBook = function(req, res) {

    console.log( req.body)
    var users = {
        "user_id": req.body.user_id,
        "customer_name": req.body.customer_name,
        "customer_number": req.body.customer_number,
        "amount": req.body.amount,
        "amount_status": req.body.amount_status,
        "total_amount": req.body.total_amount,
    }

    connection.query('INSERT INTO  khatabook SET ?', users, function(error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error+'there are some error with query'
            })
        } else {
            var khatanum = results.insertId;
            console.log(khatanum + 'id')

            connection.query('SELECT * FROM khatabook WHERE khatanum = ?', [khatanum], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    // fields: fields,
                    message: 'Khata book information  insert Successfully'
                })
            })
        }
    })
}

/////////////////////////////////////////////////////////
module.exports.addKhataBookAmount = function(req, res) {
    var users = {
        "khatanum": req.body.khatanum,
        "amount": req.body.amount,
        "amount_status": req.body.amount_status,
        "total_amount": req.body.total_amount,
        "amount_date":new Date(),
        "description": req.body.description,
    }
    connection.query('INSERT INTO  khata_hisab SET ?', users, function(error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error+'there are some error with query'
            })
        } else {
            var khata_id = results.insertId;
            console.log(khata_id + 'id')

            connection.query('SELECT * FROM khata_hisab WHERE khata_id = ?', [khata_id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    // fields: fields,
                    message: 'Khata book Amount information  insert Successfully'
                })
            })
        }
    })
}

module.exports.khataamountbyid = function(req, res) {
    connection.query('SELECT * FROM khata_hisab WHERE khatanum=?', [req.params.khatanum], (err, results) => {
        if (!err) {
            res.send(results);
        } else {
            console.log(err)
        }
    });
}


module.exports.deleteKhatahisab = function(req, res) {
    connection.query('DELETE FROM khata_hisab WHERE khatanum=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Khata Clear Successfully'

            })
        } else {
            console.log(err)
        }
    });
}
module.exports.deleteKhataCustomer = function(req, res) {
        connection.query('DELETE FROM khatabook WHERE khatanum=?', [req.params.id], (err) => {
        if (!err) {
            console.log('deleted')
            res.json({
                status: true,
                message: ' Khata deleted Successfully'

            })
        } else {
            console.log(err)
        }
    });
}