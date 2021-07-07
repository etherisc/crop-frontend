console.log('loading telegram-transport.js');

const TelegramBot = require('node-telegram-bot-api');

let bot = null;
let chatId = null;

const connectBot = () => {

	if (!bot) {
		const token = settings('telegram.bot.token');
		bot = new TelegramBot(token, {polling: true});
		let chatId = null;
		bot.onText(/\/start/, (msg) => {
			chatId = msg.chat.id;
			bot.sendMessage(chatId, 'Hello, ready to receive your messages!');
		});

	}
}



const sendTelegram = (msg) => {
	
	if (!bot) connectBot();
	if (chatId) bot.sendMessage(chatId, msg);
	
};

module.exports = { sendTelegram };