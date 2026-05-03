require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const nodemailer = require("nodemailer");

// templates
const loginTemplate = require("./templates/login");
const resetTemplate = require("./templates/reset");
const deleteTemplate = require("./templates/delete");

// bot init
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// template selector
function getTemplate(type, data) {
  if (type === "login") return loginTemplate(data);
  if (type === "reset") return resetTemplate(data);
  if (type === "delete") return deleteTemplate(data);
  throw new Error("Invalid template");
}

// user state
let userState = {};


// 🚀 START MENU
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

  if (msg.text.startsWith("/")) return;
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

      await transporter.sendMail(mailOptions);

      bot.sendMessage(chatId, "✅ Mail Sent Successfully");

    } catch (err) {
      console.log(err);
      bot.sendMessage(chatId, "❌ Error sending mail");
    }

    delete userState[chatId];
  }
});