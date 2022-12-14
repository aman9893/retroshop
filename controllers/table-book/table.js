var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.tabelInfoList = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
connection.query('SELECT * FROM  book_bill   RIGHT JOIN restro_table   ON  book_bill.table_id =restro_table.table_id   WHERE restro_table.user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.addTable = function(req, res) {
    console.log(req.body)
    var users = {
        "user_id": req.body.user_id,
        "table_name": req.body.table_name,
    }
    connection.query('INSERT INTO restro_table SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            var id = results.insertId;
            console.log(id + 'id')
            connection.query('SELECT * FROM restro_table WHERE _id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Table Name Save Successfully'
                })
            })
        }
    })
}

module.exports.Updatetable = function(req, res) {
    console.log(req.body)
    let tableid = req.body.table_id
    var data = {
        "user_id": req.body.user_id,
        "table_name": req.body.table_name,
    }

    connection.query('UPDATE restro_table SET ? WHERE table_id = ?', [data, tableid], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = tableid;
            connection.query('SELECT * FROM restro_table WHERE table_id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Table Name Update  Successfully'
                })
            })
        }
    })
}

module.exports.deleteTable = function(req, res) {
    connection.query('DELETE FROM restro_table WHERE table_id=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Table Deleted Successfully'
            })
        } else {
        }
    });

}

// /////////////////////////////////////////////////menu///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

module.exports.menuInfoList = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    connection.query('SELECT * FROM  menu WHERE user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}

module.exports.addMenu = function(req, res) {
    console.log(req.body)
    var users = {
        "user_id": req.body.user_id,
        "menu_name": req.body.menu_name,
        "menu_price": req.body.menu_price,
    }
    connection.query('INSERT INTO menu SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
                res.json({
                    status: true,
                    data: results,
                    message: 'Menu Save Successfully'
                })
            
        }
    })
}

module.exports.UpdateMenu = function(req, res) {
    console.log(req.body)
    let menuid = req.body.menu_id
    var data = {
        "user_id": req.body.user_id,
        "menu_name": req.body.menu_name,
        "menu_price": req.body.menu_price,
    }

    connection.query('UPDATE menu SET ? WHERE menu_id = ?', [data, menuid], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
                res.json({
                    status: true,
                    data: results,
                    message: 'Menu Update  Successfully'
                })
        }
    })
}

module.exports.deleteMenu = function(req, res) {
    connection.query('DELETE FROM menu WHERE menu_id=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Menu Deleted Successfully'
            })
        } else {
        }
    });

}