import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "rimowaclientcare@gmail.com",
    pass: "Rimowaclientcare123"
  }
});

export default transporter;
