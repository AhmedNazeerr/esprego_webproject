"use strict";
const nodemailer = require("nodemailer");
const dotenv=require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: `${dotenv.parsed.Service}`,
  host: `${dotenv.parsed.Host}`,
  port: `${dotenv.parsed.Port}`,
  secure: `${dotenv.parsed.Secure}`,
  auth: {
    user:`${dotenv.parsed.mail_user}`,
    pass:`${dotenv.parsed.mail_pass}`// naturally, replace both with your real credentials or an application-specific password
  },
});
module.exports=transporter;