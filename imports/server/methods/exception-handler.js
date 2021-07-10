console.log('loading exception-handler.js');


const handlers = [];

process.on('uncaughtException', function (error) {
	const message = error.message;
	const stack = error.stack;
	error(`Uncaught Exception: ${message}`, {message, stack});
	handlers.forEach((cb) => cb('exception', error));
});

process.on('unhandledRejection', function (error, p) {
	const message = error.message;
	const stack = error.stack;
	error(`Unhandled Rejection: ${message}`, {message, stack});
	handlers.forEach((cb) => cb('rejection', error, p));
});
	
	
const addExceptionHandler = (cb) => {
	handlers.push(cb);
};

module.exports = { addExceptionHandler };
	