var nodemailer = require('nodemailer');

exports.isUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Please log in.');
        res.redirect('/');
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.isAuthenticated() && res.locals.user.is_admin === '1') {
        next();
    } else {
       req.flash('error', 'Please log in as admin.');
        res.redirect('/admin');
    }
}
 

exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mamta.infowind@gmail.com',
    pass: 'infowind@123'
  }
});

// exports.transporter = nodemailer.createTransport({
//    service: 'gmail', 
//     host: 'smtp.gmail.com',
//     port: '587',
//     secure: false,
//     requireTLS: false,
//     auth: {   
//         user: 'inlystdev@gmail.com', 
//         pass: 'deV0201!'
//     } 
// host: "framework.infowindtech.biz",  
// secure: true,
// port: 465,
// auth: {   
//     user: 'node@framework.infowindtech.biz', 
//     pass: 'Infowind@123'
// } 
// });


