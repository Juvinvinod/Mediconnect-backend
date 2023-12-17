import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const passToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

export const PassTime = () => {
  return Date.now() + 3600000; //1 hour from now
};

export const sendOtpVerificationEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'Gmail',
    secure: true,
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASS,
    },
  });
  await transporter.sendMail({
    to: email,
    from: process.env.NM_EMAIL,
    subject: 'Mediconnect mail Verification',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MEDICONNECT</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Mediconnect. Use the following link to reset password.
           OTP is valid for 10 minutes</p>
          <a href='http://localhost:4200/newpassword/${otp}'>Click here!!</a>
          <p style="font-size:0.9em;">Regards,<br/>Mediconnect</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
  });
};

export const mailVerificationEmail = async (
  email: string,
  otp: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'Gmail',
    secure: true,
    auth: {
      user: process.env.NM_EMAIL,
      pass: process.env.NM_PASS,
    },
  });
  await transporter.sendMail({
    to: email,
    from: process.env.NM_EMAIL,
    subject: 'Mediconnect mail Verification',
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MEDICONNECT</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Mediconnect. Use the following link to complete your Sign Up procedures.
           OTP is valid for 10 minutes</p>
          <a href='http://localhost:4200/email/${otp}'>Click here!!</a>
          <p style="font-size:0.9em;">Regards,<br/>Mediconnect</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
  });
};
