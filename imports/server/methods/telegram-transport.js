console.log('loading telegram-transport.js');

import { settings } from '/imports/server/methods/settings.js';

const TelegramBot = require('node-telegram-bot-api');

let tgBot = {};

tgBot.chatId = null;
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

			tgBot.bot.on('polling_error', Meteor.bindEnvironment(({message, stack}) => {
				tgBot.bot.stopPolling();
				error('Telegram polling error, stopping polling... maybe other bot instance running?', {message, stack});
				tgBot.chatId = '';
				tgBot.pollingError = true;
			}));

			tgBot.bot.onText(/\/start/, async (msg) => {
				if (tgBot.connected()) {
					await tgBot.bot.sendMessage(tgBot.chatId, 'Hello, bot is already listening!');	
					return;
				}
				tgBot.chatId = msg.chat.id;
				await tgBot.bot.sendMessage(tgBot.chatId, 'Hello, ready to receive your messages!');
				info(`Bot connected, chatId = ${tgBot.chatId}`);
			});

		}
	} catch ({message, stack}) {
		error('Error connecting Telegram Bot', {message, stack});
	};
}

tgBot.sendTelegram = async (msg) => {

	try {
		if (!tgBot.connected()) tgBot.connectBot();
		await tgBot.bot.sendMessage(tgBot.chatId, msg);
	} catch ({message, stack}) {
		error('Error sending Telegram Message', {message, stack});
	}
};

tgBot.connectBot();

module.exports = tgBot;