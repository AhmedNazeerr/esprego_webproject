"use strict";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "464",
  secure: true,
  auth: {
    user: "esprego.coffee@gmail.com",
    pass: "kaigtpekirlqpspm", // naturally, replace both with your real credentials or an application-specific password
  },
});
module.exports=transporter;