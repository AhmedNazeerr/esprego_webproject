// "use strict";
// const nodemailer = require('nodemailer');
// const dotenv=require('dotenv').config();
// const transporter = nodemailer.createTransport({
//   service: `gmail`,
//   host: `smtp.gmail.com`,
//   port: `587`,
//   secure: `true`,
//   auth: {
//     user:`esprego.coffee@gmail.com`,
//     pass:`kajynbfuwtagzssl`// naturally, replace both with your real credentials or an application-specific password
//   },
// });
 
// const mailOptions = {
//     from: "esprego.coffee@gmail.com",
//     to: "esprego.coffee@gmail.com",
//     subject: "Thankyou For Shopping",
//     html:`<doctype html>
//     <html>
//     <head>
//         <meta charset="utf-8">
//         <title>Muskaan Dental Care Estimate Mail</title>
//         <style>
//             .invoice-box {
//                 background-color: #FFFFFF;
//                 max-width: 800px;
//                 margin: 30px 0;
//                 padding: 30px;
//                 border: 1px solid #eee;
//                 box-shadow: 0 0 10px rgba(0, 0, 0, .15);
//                 font-size: 16px;
//                 line-height: 24px;
//                 font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
//                 color: #555;
//             }

//             .invoice-boxx {
//                 background-image: url("http://images.alphacoders.com/458/458169.jpg");
//                 max-width: 800px;
//                 margin: auto;
//                 padding: 30px;
//                 border: 1px solid #eee;
//                 box-shadow: 0 0 10px rgba(0, 0, 0, .15);
//                 font-size: 16px;
//                 line-height: 24px;
//                 font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
//                 color: #f7f7f7;
//             }

//             .btn {
//                 background: #3cb0fd;
//                 background-image: -webkit-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -moz-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -ms-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -o-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: linear-gradient(to bottom, #3cb0fd, #3cb0fd);
//                 -webkit-border-radius: 4;
//                 -moz-border-radius: 4;
//                 border-radius: 4px;
//                 font-family: Arial;
//                 color: #ffffff;
//                 font-size: 35px;
//                 padding: 6px 16px 10px 20px;
//                 text-decoration: none;
//             }

//             .btn:hover {
//                 background: #3cb0fd;
//                 background-image: -webkit-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -moz-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -ms-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: -o-linear-gradient(top, #3cb0fd, #3cb0fd);
//                 background-image: linear-gradient(to bottom, #3cb0fd, #3cb0fd);
//                 text-decoration: none;
//             }

//             .invoice-box table {
//                 width: 100%;
//                 line-height: inherit;
//                 text-align: left;
//             }

//             .invoice-box table td {
//                 padding: 5px;
//                 vertical-align: top;
//             }

//             .invoice-box table tr td:nth-child(2) {
//                 text-align: right;
//             }

//             .invoice-box table tr.top table td {
//                 padding-bottom: 20px;
//             }

//             .invoice-box table tr.top table td.title {
//                 font-size: 45px;
//                 line-height: 45px;
//                 color: #333;
//             }

//             .invoice-box table tr.information table td {
//                 padding-bottom: 40px;
//             }

//             .invoice-box table tr.heading td {
//                 background: #EEEEE0;
//                 border-bottom: 1px solid #ddd;
//                 font-weight: bold;
//             }

//             .invoice-box table tr.details td {
//                 padding-bottom: 20px;
//             }

//             .invoice-box table tr.item td {
//                 border-bottom: 1px solid #eee;
//             }

//             .invoice-box table tr.item.last td {
//                 border-bottom: none;
//             }

//             .invoice-box table tr.total td:nth-child(2) {
//                 border-top: 2px solid #eee;
//                 font-weight: bold;
//             }

//             @media only screen and (max-width: 600px) {
//                 .invoice-box table tr.top table td {
//                     width: 100%;
//                     display: block;
//                     text-align: center;
//                 }

//                 .invoice-box table tr.information table td {
//                     width: 100%;
//                     display: block;
//                     text-align: center;
//                 }
//             }
//         </style>
//     </head>

//     <body>
//         <div class="invoice-boxx">
//             <h1 align="center">Esprego Coffee</h1>
//             <div class="invoice-box">
//                 <table cellpadding="0" cellspacing="0">
//                     <tr class="top">
//                         <td colspan="2">
//                         </td>
//                     </tr>
//                     <tr class="information">
//                         <td>
//                     <tr>
//                         <td> <br> <br> <br> </td>
//                         <td> <strong>Billed To:</strong><br> checking mailer error <br> <br> </td>
//                     </tr>
//                     </td>
//                     </tr>
//                     <table>
//                         <tr class="heading">
//                             <td> Payment Method </td>
//                             <td> Card </td>
//                         </tr>
//                         <tr class="total">
//                             <td>Total</td>
//                             <td>90000</td>
//                         </tr>
//                     </table>
//                     <p align="center"><strong>Thank You For Choosing Us</strong></p>
//             </div>
//             </hr>
//             <div>
//                 </hr>
//             </div>
//             <div class="invoice-box">
//                 <h1 align="center">Esprego Coffee</h1>
//                 <p align="center">p#202, Gulberg-A<br>Faisalabad<br> Phone: +92090980076<br> Email:
//                     esprego.coffee@gmail.com<br> Website:<a
//                         href="www.espregocoffee.com">www.muskaandentalcare.webs.com</a><br></p>
//                 <div align="center"> <a href="#"> <img
//                             src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png"
//                             align="middle" style="width:10%; max-width:50px;"> </a> <a href="#"> <img
//                             src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/google_circle_color-128.png"
//                             align="middle" style="width:10%; max-width:50px;"> </a> </div>
//                 <div align="center"> <a href=" www.muskaandentalcare.webs.com"> &copy All Rights Reserved.</a> </div>
//     </body>

//     </html>`
//   };
//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//  console.log(error)
//     } else {
//       console.log("Email sent: " + info.response);
//     }
// })