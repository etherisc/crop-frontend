Router.route(
	"/payments", 
	{
		controller: "PaymentsController",
		where: "server"
	}
);

Router.route(
	"/payments/:id", 
	{
		controller: "PaymentsController",
		where: "server"
	}
);

Router.route(
	"/activations", 
	{
		controller: "ActivationsController",
		where: "server"
	}
);

Router.route(
	"/activations/:id", 
	{
		controller: "ActivationsController",
		where: "server"
	}
);

