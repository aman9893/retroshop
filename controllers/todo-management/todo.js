var connection = require('../../config/config');
var jwt = require('jsonwebtoken');


module.exports.TaskTodolistData = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    var userid = varid.NewData.id;
    var role_id = req.params.role_id;
    connection.query(`SELECT * FROM todo_task WHERE emp_id = ${userid}`,  (err, result) => {
        
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}

module.exports.todoTaskByuniqueid = function(req, res) {

    connection.query('SELECT * FROM todo_task WHERE emp_id=?', [req.params.emp_id], (err, results, fields) => {
        if (!err) {
            res.send(results);
        } else {
        }
    });
}




module.exports.addTdoTask = function(req, res) {
    var users = {
        "emp_id": req.body.emp_id,
        "todo_date": req.body.todo_date,
        "todo_note": req.body.todo_note,
        "todo_status": req.body.todo_status,
        "emp_unique":req.body.emp_unique,
        "rolename_id":req.body.rolename_id

    }
    connection.query('INSERT INTO todo_task SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            var id = results.insertId;
            connection.query('SELECT * FROM todo_task WHERE todo_id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Task  insert Successfully'
                })
            })
        }
    })
}

module.exports.deleteTodotasks = function(req, res) {
    connection.query('DELETE FROM todo_task WHERE todo_id=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Task deleted Successfully'

            })
        } else {
        }
    });
}

module.exports.UpdateStatusTodoTask = function(req, res) {

    let todo_id = req.body.todo_id

    var data = {
        "todo_status": req.body.todo_status
    }

    connection.query('UPDATE todo_task SET ? WHERE todo_id = ?', [data, todo_id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = todo_id;
            connection.query('SELECT * FROM todo_task WHERE todo_id = ?', [id], function(error, results, fields) {
               
                res.json({
                    status: true,
                    data: results,
                    // fields: fields,
                    message: 'Task   Update  Successfully'
                })
            })
        }
    })
}