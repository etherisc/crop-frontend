console.log('loading telegram-transport.js');

import { settings } from '/imports/server/methods/settings.js';

const TelegramBot = require('node-telegram-bot-api');

let tgBot = {};

tgBot.chatId = null;
tgBot.connected = false;
tgBot.pollingError = false;

tgBot.connected = () => !!tgBot.chatId && !tgBot.pollingError;

tgBot.connectBot = () => {

	try {
		if (!tgBot.bot) {
			tgBot.token = settings('telegram.bot.token');
			if (!tgBot.token) {
				error('Could not start telegram bot, not token provided');
				return;
			}
			
			tgBot.bot = new TelegramBot(tgBot.token, {polling: true});
			
			tgBot.on('polling_error', (error) => {
				tgBot.bot.stopPolling();
				error('Telegram polling error, stopping polling...', {message: error.message});
				tgBot.chatId = '';
				tgBot.pollingError = true;
			});
			
			tgBot.bot.onText(/\/start/, async (msg) => {
				tgBot.chatId = msg.chat.id;
				await tgBot.bot.sendMessage(tgBot.chatId, 'Hello, ready to receive your messages!');
			});

		}
	} catch ({message, stack}) {
		error('Error connecting Telegram Bot', {message, stack});
	};
}

tgBot.sendTelegram = async (msg) => {

	if (tgBot.connected()) {
		await tgBot.bot.sendMessage(tgBot.chatId, msg);
	} else {
		connectBot();
	}
};

tgBot.connectBot();

module.exports = tgBot;