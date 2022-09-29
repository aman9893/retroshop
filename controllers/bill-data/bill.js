var connection = require('../../config/config');
var jwt = require('jsonwebtoken');
const fs = require("fs");
module.exports.billList = function (req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    console.log(userid)
    connection.query('SELECT * FROM  book_bill WHERE user_id = ' + userid + ' ORDER BY bill_id DESC  ', (err, result) => {
        if (err) throw err;
        console.log(result)
        res.end(JSON.stringify(result));
    })
}


module.exports.billListByid = function(req, res) {
    console.log(req.params.id)
    connection.query('SELECT * FROM book_bill WHERE  table_id=?', [req.params.id], (err, results) => {
        if (err) throw err;
        console.log(results)
        res.end(JSON.stringify(results));
    });
}
/////////////////////////////////////////////////////////
module.exports.addBill = function (req, res) {
    var responseJson = JSON.stringify(req.body);
    console.log(responseJson)
    var users = {
        "user_id": req.body.user_id,
        "bill_no": req.body.bill_no,
        "bill_order": responseJson,
        "table_id": req.body.table_id,
        "table_name": req.body.table_name,
        "total_bill": req.body.total_bill,
        "bill_status": req.body.bill_status,

    }
    connection.query('INSERT INTO    book_bill SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error + 'there are some error with query'
            })
        } else {

            res.json({
                status: true,
                data: results,
                message: 'Bill Save  Successfully'
            })
        }
    })
}


module.exports.UpdatebillInfo = function (req, res) {
    var responseJson = JSON.stringify(req.body);
    let bill_id = req.body.bill_id
    console.log(bill_id)
    var users = {
        "user_id": req.body.user_id,
        "bill_no": req.body.bill_no,
        "bill_order": responseJson,
        "table_id": req.body.table_id,
        "table_name": req.body.table_name,
        "total_bill": req.body.total_bill,
        "bill_status": req.body.bill_status,
    }

    connection.query('UPDATE  book_bill SET ? WHERE bill_id = ?', [users, bill_id], function (error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

            connection.query('SELECT * FROM  book_bill WHERE bill_id = ?', [bill_id], function (error, results, fields) {
                console.log(results)
                res.json({
                    status: true,
                    data: results,
                    message: 'Bill  Update  Successfully'
                })
            })
        }
    })
}

module.exports.deleteBill = function (req, res) {
    connection.query('DELETE FROM  book_bill WHERE bill_id=?', [req.params.id], (err) => {
        if (!err) {
            console.log('deleted')
            res.json({
                status: true,
                message: 'Bill deleted Successfully'

            })
        } else {
            console.log(err)
        }
    });
}


//------------------------------------------------------------------------------------------------------------

module.exports.CountAllTable = function (req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token !== undefined) {

        token2 = token.slice(7, token.length).trimLeft();
        varid = jwt.decode(token2)
        if (varid.NewData != null) {
            var userid = varid.NewData.id;
        }
    }
    connection.query('SELECT count(*) as total  FROM  book_bill  where user_id = ' + userid + '', (err, result1) => {
        connection.query('SELECT count(*) as total  FROM lead_management  where user_id = ' + userid + '', (err, result2) => {
            connection.query('SELECT count(*) as total  FROM khatabook  where user_id = ' + userid + '', (err, result3) => {
                connection.query('SELECT count(*) as total  FROM stock_management  where user_id = ' + userid + '', (err, result4) => {
                    connection.query('SELECT count(*) as total  FROM contact_book  where user_id = ' + userid + '', (err, result5) => {
                        if (err) throw err;
                        var results = [];
                        results.push({
                            'billCount': result1[0].total,
                            'customercount': result2[0].total,
                            'KhataList': result3[0].total,
                            'stocklist': result4[0].total,
                            'contactlist': result5[0].total
                        });
                        res.json({
                            status: true,
                            data: results,
                            message: 'Total'
                        });
                    });
                });
            });
        });
    });
}