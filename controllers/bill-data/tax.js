var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.taxinfolist = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    connection.query('SELECT * FROM  tax WHERE user_id = ' +[userid] + ' ORDER BY tax_id DESC ', (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}



    module.exports.addtax = function(req, res) {
        var users = {
            "user_id": req.body.user_id,
           "total_tax": req.body.total_tax,
        }
        connection.query('INSERT INTO tax SET ?', users, function(error, results, fields) {
    
            if (error) {
                res.json({
                    status: false,
                    message: error
                })
            } else {
                    res.json({
                        status: true,
                        data: results,
                        message: 'tax Saved Successfully'
                    })
                
            }
        })
    }
//////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.Updatetax = function(req, res) {
    let tax_id  = req.body.tax_id 
    var data = {
        "user_id": req.body.user_id,
        "total_tax": req.body.total_tax,
    }

    connection.query('UPDATE tax SET ? WHERE tax_id  = ?', [data, tax_id ], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = tax_id ;
            connection.query('SELECT * FROM tax WHERE tax_id  = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Tax  Update  Successfully'
                })
            })
        }
    })
}






module.exports.deleteTax = function(req, res) {
    connection.query('DELETE FROM tax WHERE tax_id=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Tax Deleted Successfully'
            })
        } else {
        }
    });
}
