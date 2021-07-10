console.log('loading telegram-transport.js');

import { settings } from '/imports/server/methods/settings.js';

const TelegramBot = require('node-telegram-bot-api');

let bot = null;
let chatId = null;

const connectBot = () => {

	if (!bot) {
		const token = settings('telegram.bot.token');
		if (!token) return;
		bot = new TelegramBot(token, {polling: true});
		chatId = null;
		bot.onText(/\/start/, async (msg) => {
			chatId = msg.chat.id;
			await bot.sendMessage(chatId, 'Hello, ready to receive your messages!');
		});

	}
}



const sendTelegram = async (msg) => {
	
	if (!bot) connectBot();
	if (bot && chatId) await bot.sendMessage(chatId, msg);
	
};

connectBot();

module.exports = { sendTelegram };