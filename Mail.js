const nodemailer = require('nodemailer'); 
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    requireTLS: false,
    auth: {   
        user: 'inlystdev@gmail.com', 
        pass: 'deV0201!'
    } 
}); 
  
let mailDetails = { 
    from: 'inlystdev@gmail.com', 
    to: 'anit.infowind@gmail.com', 
    subject: 'Node mail', 
    text: 'Node.js  mail for GeeksforGeeks'
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
    	console.log(err);
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 