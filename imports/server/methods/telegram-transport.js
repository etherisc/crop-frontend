console.log('loading telegram-transport.js');

import { settings } from '/imports/server/methods/settings.js';
import { addExceptionHandler } from '/imports/server/methods/exception-handler.js';

const TelegramBot = require('node-telegram-bot-api');

let tgBot = {};

tgBot.chatId = null;
tgBot.connected = false;
tgBot.connected = () => !!tgBot.chatId;
tgBot.connectBot = () => {

	try {
		if (!tgBot.bot) {
			tgBot.token = settings('telegram.bot.token');
			if (!tgBot.token) {
				error('Could not start telegram bot, not token provided');
				return;
			}
			tgBot.bot = new TelegramBot(tgBot.token, {polling: true});
			tgBot.bot.onText(/\/start/, async (msg) => {
				tgBot.chatId = msg.chat.id;
				await tgBot.bot.sendMessage(tgBot.chatId, 'Hello, ready to receive your messages!');
			});

		}
	} catch ({message, stack}) {
		error('Error connecting Telegram Bot', {message, stack});
	};
}

addExceptionHandler((type, error)  => {
	if (type === 'exception') {
		tgBot.bot.stopPolling();
	}
});

tgBot.sendTelegram = async (msg) => {

	if (tgBot.connected()) {
		await tgBot.bot.sendMessage(tgBot.chatId, msg);
	} else {
		connectBot();
	}
};

tgBot.connectBot();

module.exports = tgBot;