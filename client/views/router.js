Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"admin.jobs",
	"admin.jobs.insert",
	"admin.jobs.update",
	"admin.jobs.details",
	"admin.logs_browser",
	"admin.logs_server",
	"admin.details_modal",
	"admin.logs_sms",
	"admin.logs_sms.details",
	"admin.notifications",
	"admin.notifications.insert",
	"admin.notifications.update",
	"admin.notifications.details",
	"admin.payout_schedules",
	"admin.payout_schedules.insert",
	"admin.payout_schedules.update",
	"admin.payout_schedules.details",
	"admin.payout_schedules.details.details",
	"admin.payout_schedules.details.update",
	"admin.settings_page",
	"admin.settings_page.insert",
	"admin.settings_page.update",
	"admin.settings_page.details",
	"admin.logs_business_task",
	"admin.logs_business_task.details",
	"logout",
	"blockchain",
	"dashboard",
	"activations_page",
	"activations_page.insert",
	"activations_page.update",
	"activations_page.details",
	"activations_map",
	"group_policies",
	"group_policies.details",
	"group_policies.details.details",
	"locations",
	"locations.insert",
	"locations.update",
	"locations.details",
	"payments_page",
	"payments_page.insert",
	"payments_page.update",
	"payments_page.details",
	"partners",
	"partners.insert",
	"partners.update",
	"partners.details",
	"policies_page",
	"policies_page.details",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin","readonly"] },
	{ route: "admin.users",	roles: ["admin","blocked","user"] },
	{ route: "admin.users.details",	roles: ["admin","blocked","user"] },
	{ route: "admin.users.insert",	roles: ["admin","blocked","user"] },
	{ route: "admin.users.edit",	roles: ["admin","blocked","user"] },
	{ route: "admin.jobs",	roles: ["admin","blocked","user"] },
	{ route: "admin.jobs.insert",	roles: ["admin","blocked","user"] },
	{ route: "admin.jobs.update",	roles: ["admin","blocked","user"] },
	{ route: "admin.jobs.details",	roles: ["admin","blocked","user"] },
	{ route: "admin.logs_browser",	roles: ["admin","blocked","user"] },
	{ route: "admin.logs_server",	roles: ["admin","blocked","user"] },
	{ route: "admin.details_modal",	roles: ["admin","blocked","user"] },
	{ route: "admin.logs_sms",	roles: ["admin","blocked","user"] },
	{ route: "admin.logs_sms.details",	roles: ["admin","blocked","user"] },
	{ route: "admin.notifications",	roles: ["admin","blocked","user"] },
	{ route: "admin.notifications.insert",	roles: ["admin","blocked","user"] },
	{ route: "admin.notifications.update",	roles: ["admin","blocked","user"] },
	{ route: "admin.notifications.details",	roles: ["admin","blocked","user"] },
	{ route: "admin.payout_schedules",	roles: ["admin","readonly"] },
	{ route: "admin.payout_schedules.insert",	roles: ["admin","readonly"] },
	{ route: "admin.payout_schedules.update",	roles: ["admin","readonly"] },
	{ route: "admin.payout_schedules.details",	roles: ["admin","readonly"] },
	{ route: "admin.payout_schedules.details.details",	roles: ["admin","readonly"] },
	{ route: "admin.payout_schedules.details.update",	roles: ["admin","readonly"] },
	{ route: "admin.settings_page",	roles: ["admin","blocked","user"] },
	{ route: "admin.settings_page.insert",	roles: ["admin","blocked","user"] },
	{ route: "admin.settings_page.update",	roles: ["admin","blocked","user"] },
	{ route: "admin.settings_page.details",	roles: ["admin","blocked","user"] },
	{ route: "admin.logs_business_task",	roles: ["admin","readonly"] },
	{ route: "admin.logs_business_task.details",	roles: ["admin","readonly"] },
	{ route: "blockchain",	roles: ["admin","blocked","user"] },
	{ route: "dashboard",	roles: ["admin","blocked","user"] },
	{ route: "activations_page",	roles: ["admin","blocked","user"] },
	{ route: "activations_page.insert",	roles: ["admin","blocked","user"] },
	{ route: "activations_page.update",	roles: ["admin","blocked","user"] },
	{ route: "activations_page.details",	roles: ["admin","blocked","user"] },
	{ route: "locations",	roles: ["admin","blocked","user"] },
	{ route: "locations.insert",	roles: ["admin","blocked","user"] },
	{ route: "locations.update",	roles: ["admin","blocked","user"] },
	{ route: "locations.details",	roles: ["admin","blocked","user"] },
	{ route: "payments_page",	roles: ["admin","blocked","user"] },
	{ route: "payments_page.insert",	roles: ["admin","blocked","user"] },
	{ route: "payments_page.update",	roles: ["admin","blocked","user"] },
	{ route: "payments_page.details",	roles: ["admin","blocked","user"] },
	{ route: "policies_page",	roles: ["admin","blocked","user"] },
	{ route: "policies_page.details",	roles: ["admin","blocked","user"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// add unique class to body element for each route
	if(Router.current()) {
		var currentRouteName = Router.current().route.getName();
		var prevRouteName = Session.get("currentRouteName");
		if(prevRouteName && prevRouteName != currentRouteName) {
			$("body").removeClass("page-" + toKebabCase(prevRouteName));
		}
		Session.set("currentRouteName", currentRouteName);
		$("body").addClass("page-" + toKebabCase(currentRouteName));
	}

	// loading indicator here
	if(!this.ready()) {
		this.render("loading");
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}

});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/admin/jobs", {name: "admin.jobs", title: "", controller: "AdminJobsController"});
	this.route("/admin/jobs/insert", {name: "admin.jobs.insert", title: "", controller: "AdminJobsInsertController"});
	this.route("/admin/jobs/update/:jobId", {name: "admin.jobs.update", title: "", controller: "AdminJobsUpdateController"});
	this.route("/admin/jobs/details/:jobId", {name: "admin.jobs.details", title: "", controller: "AdminJobsDetailsController"});
	this.route("/admin/logs_browser", {name: "admin.logs_browser", title: "", controller: "AdminLogsBrowserController"});
	this.route("/admin/logs_server", {name: "admin.logs_server", title: "", controller: "AdminLogsServerController"});
	this.route("/admin/details_modal", {name: "admin.details_modal", title: "", controller: "AdminDetailsModalController"});
	this.route("/admin/logs_sms", {name: "admin.logs_sms", title: "", controller: "AdminLogsSmsController"});
	this.route("/admin/logs_sms/details/:loglineSmsId", {name: "admin.logs_sms.details", title: "", controller: "AdminLogsSmsDetailsController"});
	this.route("/admin/notifications", {name: "admin.notifications", title: "", controller: "AdminNotificationsController"});
	this.route("/admin/notifications/insert", {name: "admin.notifications.insert", title: "", controller: "AdminNotificationsInsertController"});
	this.route("/admin/notifications/update/:notificationId", {name: "admin.notifications.update", title: "", controller: "AdminNotificationsUpdateController"});
	this.route("/admin/notifications/details/:notificationId", {name: "admin.notifications.details", title: "", controller: "AdminNotificationsDetailsController"});
	this.route("/admin/payout_schedules", {name: "admin.payout_schedules", title: "", controller: "AdminPayoutSchedulesController"});
	this.route("/admin/payout_schedules/insert", {name: "admin.payout_schedules.insert", title: "", controller: "AdminPayoutSchedulesInsertController"});
	this.route("/admin/payout_schedules/update/:payoutScheduleId", {name: "admin.payout_schedules.update", title: "", controller: "AdminPayoutSchedulesUpdateController"});
	this.route("/admin/payout_schedules/details/:payoutScheduleId", {name: "admin.payout_schedules.details", title: "", controller: "AdminPayoutSchedulesDetailsController"});
	this.route("/admin/payout_schedules/details/:payoutScheduleId/details/:policyId", {name: "admin.payout_schedules.details.details", title: "", controller: "AdminPayoutSchedulesDetailsDetailsController"});
	this.route("/admin/payout_schedules/details/:payoutScheduleId/update/:policyId", {name: "admin.payout_schedules.details.update", title: "", controller: "AdminPayoutSchedulesDetailsUpdateController"});
	this.route("/admin/settings_page", {name: "admin.settings_page", title: "", controller: "AdminSettingsPageController"});
	this.route("/admin/settings_page/insert", {name: "admin.settings_page.insert", title: "", controller: "AdminSettingsPageInsertController"});
	this.route("/admin/settings_page/update/:settingId", {name: "admin.settings_page.update", title: "", controller: "AdminSettingsPageUpdateController"});
	this.route("/admin/settings_page/details/:settingId", {name: "admin.settings_page.details", title: "", controller: "AdminSettingsPageDetailsController"});
	this.route("/admin/logs_business_task", {name: "admin.logs_business_task", title: "", controller: "AdminLogsBusinessTaskController"});
	this.route("/admin/logs_business_task/details/:btxLineId", {name: "admin.logs_business_task.details", title: "", controller: "AdminLogsBusinessTaskDetailsController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/blockchain", {name: "blockchain", title: "Connect to Wallet", controller: "BlockchainController"});
	this.route("/dashboard", {name: "dashboard", title: "", controller: "DashboardController"});
	this.route("/activations_page", {name: "activations_page", title: "Activations", controller: "ActivationsPageController"});
	this.route("/activations_page/insert", {name: "activations_page.insert", title: "Activations", controller: "ActivationsPageInsertController"});
	this.route("/activations_page/update/:activationId", {name: "activations_page.update", title: "Activations", controller: "ActivationsPageUpdateController"});
	this.route("/activations_page/details/:activationId", {name: "activations_page.details", title: "Activations", controller: "ActivationsPageDetailsController"});
	this.route("/activations_map", {name: "activations_map", title: "", controller: "ActivationsMapController"});
	this.route("/group_policies", {name: "group_policies", title: "Group Policies", controller: "GroupPoliciesController"});
	this.route("/group_policies/details/:groupPolicyId", {name: "group_policies.details", title: "Group Policies", controller: "GroupPoliciesDetailsController"});
	this.route("/group_policies/details/:groupPolicyId/details/:policyId", {name: "group_policies.details.details", title: "Group Policies", controller: "GroupPoliciesDetailsDetailsController"});
	this.route("/locations", {name: "locations", title: "", controller: "LocationsController"});
	this.route("/locations/insert", {name: "locations.insert", title: "", controller: "LocationsInsertController"});
	this.route("/locations/update/:locationId", {name: "locations.update", title: "", controller: "LocationsUpdateController"});
	this.route("/locations/details/:locationId", {name: "locations.details", title: "", controller: "LocationsDetailsController"});
	this.route("/payments_page", {name: "payments_page", title: "", controller: "PaymentsPageController"});
	this.route("/payments_page/insert", {name: "payments_page.insert", title: "", controller: "PaymentsPageInsertController"});
	this.route("/payments_page/update/:paymentId", {name: "payments_page.update", title: "", controller: "PaymentsPageUpdateController"});
	this.route("/payments_page/details/:paymentId", {name: "payments_page.details", title: "", controller: "PaymentsPageDetailsController"});
	this.route("/partners", {name: "partners", title: "", controller: "PartnersController"});
	this.route("/partners/insert", {name: "partners.insert", title: "", controller: "PartnersInsertController"});
	this.route("/partners/update/:partnerId", {name: "partners.update", title: "", controller: "PartnersUpdateController"});
	this.route("/partners/details/:partnerId", {name: "partners.details", title: "", controller: "PartnersDetailsController"});
	this.route("/policies_page", {name: "policies_page", title: "", controller: "PoliciesPageController"});
	this.route("/policies_page/details/:policyId", {name: "policies_page.details", title: "", controller: "PoliciesPageDetailsController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
});
