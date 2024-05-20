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
    connection.query('SELECT * FROM  book_bill WHERE user_id = ' + userid + ' ORDER BY bill_id DESC  ', (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}


module.exports.billListByid = function(req, res) {
    connection.query('SELECT * FROM book_bill WHERE  table_id=?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
}

module.exports.billListBillId= function(req, res) {
    connection.query('SELECT * FROM book_bill WHERE  bill_id=?', [req.params.id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
}


module.exports.todaybillList = function (req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    connection.query('SELECT * FROM  book_bill WHERE user_id = ' + userid + ' and  create_date ='+GETDATE()+' ORDER BY bill_id DESC  ', (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}


/////////////////////////////////////////////////////////
module.exports.addBill = function (req, res) {
    var responseJson = JSON.stringify(req.body);
    var users = {
        "user_id": req.body.user_id,
        "bill_no": req.body.bill_no,
        "bill_order": responseJson,
        "table_id": req.body.table_id,
        "table_name": req.body.table_name,
        "total_bill": req.body.total_bill,
        "bill_status": req.body.bill_status,
        "cutomer_name": req.body.cutomer_name,
        "cutomer_number": req.body.cutomer_number,
        "create_date": req.body.create_date,
        "cutomer_address":req.body.cutomer_address,
        "delivery_charge":req.body.delivery_charge,
        "discount":req.body.discount,
        "status":req.body.status,
        "attender_id":req.body.attender_id,
        "attender_name":req.body.attender_name,
        "token_no":req.body.token_no,
        "payment_type":req.body.payment_type,
        "subtotal_bill":req.body.subtotal_bill,
        "gst_amt":req.body.gst_amt,
    }
    var users1 = {
        "user_id": req.body.user_id,
        "contact_name": req.body.cutomer_name,
        "contact_number": req.body.cutomer_number,
        "contact_email": '',
        "contact_status": 1,
    }
    
    connection.query('INSERT INTO  book_bill SET ?', users, function (error, results1, fields) {
        if (error) {
            res.json({
                status: false,
                message: error + 'there are some error with query'
            })
        } 
        else {
            connection.query('SELECT * FROM contact_book WHERE contact_number = ?', [ req.body.cutomer_number], function (error12, results2, fields) {
                if (results2.length=== 0) {
                    if(users1.contact_name.length !== 0 && users1.contact_number.length !==0){
                    connection.query('INSERT INTO contact_book SET ?', users1, function (error11, results, fields) { 
                    })
                }
                } 
          })   
            res.json({
                status: true,
                data: results1,
                message: 'Bill Save  Successfully'
            })
        }
});
}


module.exports.UpdatebillInfo = function (req, res) {
    var responseJson = JSON.stringify(req.body);
    let bill_id = req.body.bill_id
    var users = {
        "user_id": req.body.user_id,
        "bill_no": req.body.bill_no,
        "bill_order": responseJson,
        "table_id": req.body.table_id,
        "table_name": req.body.table_name,
        "total_bill": req.body.total_bill,
        "bill_status": req.body.bill_status,
        "cutomer_name": req.body.cutomer_name,
        "cutomer_number": req.body.cutomer_number,
        "create_date": req.body.create_date,
        "delivery_charge":req.body.delivery_charge,
        "discount":req.body.discount,
        "status":req.body.status,
        "attender_id":req.body.attender_id,
        "attender_name":req.body.attender_name,
        "token_no":req.body.token_no,
        "payment_type":req.body.payment_type,
        "subtotal_bill":req.body.subtotal_bill,
        "gst_amt":req.body.gst_amt,

    }

    connection.query('UPDATE  book_bill SET ? WHERE bill_id = ?', [users, bill_id], function (error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

            connection.query('SELECT * FROM  book_bill WHERE bill_id = ?', [bill_id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Bill  Update  Successfully'
                })
            })
        }
    })
}

module.exports.UpdateCompeleteOrder = function (req, res) {
    let bill_no = req.body.bill_no
    var data = {
        "bill_status": req.body.bill_status,
        "table_name": req.body.table_name, 
        "table_id": req.body.table_id,
    }

    connection.query('UPDATE  book_bill SET ? WHERE bill_no = ?', [data, bill_no], function (error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

                res.json({
                    status: true,
                    data: results,
                    message: 'Compete Order  Update  Successfully'
                })
        }
    })
}

module.exports.deleteBill = function (req, res) {
    connection.query('DELETE FROM book_bill WHERE bill_id=?', [req.params.id], function (error, results, fields) {
        if (!error) {
            res.json({
                status: true,
                message: 'Bill Deleted Successfully'

            })
        } else {
            console.log(error)
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
        connection.query('SELECT count(*) as total  FROM contact_book	 where user_id = ' + userid + '', (err, result2) => {
            connection.query('SELECT count(*) as total  FROM restro_table  where user_id = ' + userid + '', (err, result3) => {
                        if (err) throw err;
                        var results = [];
                        results.push({
                            'billCount': result1[0].total,
                            'customercount': result2[0].total,
                        });
                        res.json({
                            status: true,
                            data: results,
                            message: 'Total'
                        });
                    });
          
        });
    });
}


// ------------------------------------------------///category-------------------------------------------------------------


module.exports.categoryList = function (req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    connection.query('SELECT * FROM  category WHERE user_id = ' + userid + ' ORDER BY category_id DESC  ', (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}


module.exports.categoryListByid = function(req, res) {
    connection.query('SELECT * FROM category WHERE  category_id=?', [req.params.category_id], (err, results) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
}

module.exports.addcategory = function (req, res) {
    var users = {
        "user_id": req.body.user_id,
        "category_name":req.body.category_name,
    }
    
    connection.query('INSERT INTO category SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            var id = results.insertId;
            connection.query('SELECT * FROM category WHERE _id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Category  Name Save Successfully'
                })
            })
        }
    })

}


module.exports.updatecategory = function(req, res) {
    let category_id = req.body.category_id 
    var data = {
        "user_id": req.body.user_id,
        "category_name":req.body.category_name,
    }

    connection.query('UPDATE category SET ? WHERE category_id  = ?', [data, category_id ], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = category_id;
            connection.query('SELECT * FROM category WHERE category_id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Category Name Update  Successfully'
                })
            })
        }
    })
}

module.exports.deleteCategoryid= function(req, res) {
    connection.query('DELETE FROM category WHERE category_id=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Category Deleted Successfully'
            })
        } else {
        }
    });

}






