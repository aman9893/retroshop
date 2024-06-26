
var connection = require('../config/config');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var unirest = require("unirest");
module.exports.authenticate = function (req, res) {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE email = ? OR phone_number = ?';
    connection.query(sql, [email, email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error.message
            })
        }
        else {
            if (results.length > 0) {
                if (password == results[0].password) {
                    var NewData = (results[0]);
                    const token = jwt.sign({
                        NewData,
                        expiresInMinutes: 1
                    },

                        'my_secret_key');

                    res.json({
                        status: true,
                        token: token,
                        data: NewData,
                        message: 'Successfully Authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email or Mobile Number and password does not match"
                    });
                }

            }

            else {
                res.json({
                    status: false,
                    message: "Email or mobile no does not exits"
                });
            }
        }
    })

}

module.exports.UpdatePaymentUserDays = function (req, res) {
    let user_id = req.body.id
    var data = {
        "user_expiry_date": req.body.user_expiry_date,
        "trial_days": req.body.trial_days
    }

    connection.query('UPDATE users SET ? WHERE id = ?', [data, user_id], function (error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = user_id;
            connection.query('SELECT * FROM users WHERE id = ?', [user_id], function (error, results, fields) {

                res.json({
                    status: true,
                    data: results,
                    message: 'User  update Successfully'
                })
            })
        }
    })
}

///------------------otp check code -----------------------------------------------------------


var otp = Math.random();
otp = otp * 100000;
otp = parseInt(otp);
var userId;
module.exports.forgetPassword = function (req, res) {
    if (req.body.value == 'nootpCheck' && req.body.flag === 'email') {
        var email = req.body.email;
        var sql = 'SELECT * FROM users WHERE email = ?';

        connection.query(sql, [req.body.email], function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'Email id not there ..'
                })
            }

            else {
                if (results && results.length > 0) {
                    userId = results[0].id;
                    let transporter = nodemailer.createTransport({
                        service: 'Gmail',
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'amanyoungdeveloper@gmail.com',
                            pass: 'rgil hojq wcdy kjvw',
                        }
                    });
                    var mailOptions = {
                        to: email,
                        subject: "Otp for registration is: ",
                        html: "<h3>OTP for BillWala  account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error)
                        }
                        res.json({
                            status: true,
                            flag: 'otpsend',
                            message: 'Otp sent Successfully'
                        })
                    });
                }
                else {
                    res.json({
                        status: false,
                        message: 'Email id not exist'
                    })
                }

            }
        });
    }
    if (req.body.value == 'nootpCheck' && req.body.flag === 'phone') {
        var phone = req.body.phone;
        var sql = 'SELECT * FROM users WHERE phone_number = ?';
        connection.query(sql, [req.body.phone], function (error, results, fields) {
            if (error) {
                res.json({
                    status: false,
                    message: 'phone number  not there ..'
                })
            }

            else {
                if (results && results.length > 0) {
                    userId = results[0].id;
                    var unirest = require("unirest");
                    var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
                    req.query({
                        "authorization": "TV5SOCx7yoAPHqiUY9dbIL8vB0gmX1asrEc3Zl26eMfpkKGRJzy0PfTUZxrzMDX4amuS1cl3Og7bvnLd",
                        "sender_id": "FSTSMS",
                        "language": "english",
                        "route": "qt",
                        "numbers": phone,
                        "message": "39492",
                        "variables": "{AA}",
                        "variables_values": otp
                    });

                    req.headers({
                        "cache-control": "no-cache"
                    });

                    req.end(function (res) {
                        if (res.error) throw new Error(res.error);
                    });
                  
                        res.json({
                            status: true,
                            flag: 'otpsend',
                            message: 'Otp Sent Successfully'
                        })
                }
                else {
                    res.json({
                        status: false,
                        message: 'phone number not there'
                    })
                }

            }
        });

    }


    //////////////////////////////phone end===============

    if (req.body.value == 'otpCheck') {
        if (req.body.email == otp) {
            res.json({
                status: true,
                flag: 'otpverify',
                data: userId,
                message: 'OTP Verified  Successfully'
            })
        }
        else {
            res.json({
                status: false,
                message: 'Otp  is incorrect'
            })
        }
    }
}

module.exports.UpdatePassword = function (req, res) {
    let id = req.body.id
    var data = {
        "password": req.body.password
    }
    connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                // fields: fields,
                message: 'Password  Update  Successfully'
            })
        }
    });



}



















    // //it's a number
    // var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
    // req.headers({
    //   "authorization": "TV5SOCx7yoAPHqiUY9dbIL8vB0gmX1asrEc3Zl26eMfpkKGRJzy0PfTUZxrzMDX4amuS1cl3Og7bvnLd"
    // });
    // req.form({
    //   "sender_id": "FSTSMS",
    //   "message": "This is a test message",
    //   "language": "english",
    //   "route": "p",
    //   "numbers": '9893259754',
    // });
    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);

    //   console.log(res.body);
    // });

// app.post('/resend',function(req,res){
//     var mailOptions={
//         to: email,
//        subject: "Otp for registration is: ",
//        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body
//      };

//      transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);   
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         res.render('otp',{msg:"otp has been sent"});
//     });

// });