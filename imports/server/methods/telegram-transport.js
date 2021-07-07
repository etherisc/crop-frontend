console.log('loading telegram-transport.js');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = settings('telegram.bot.token');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

let chatId = null;

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'Hello, ready to receive your messages!');
});

  // send a message to the chat acknowledging receipt of their message
const sendTelegram = (msg) => chatId ? bot.sendMessage(chatId, 'Ok') : null;

module.exports = { sendTelegram };