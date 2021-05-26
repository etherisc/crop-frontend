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
	"dashboard",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"admin.import_jobs",
	"admin.import_jobs.insert",
	"admin.import_jobs.update",
	"admin.import_jobs.details",
	"admin.logs_browser",
	"admin.logs_server",
	"admin.details_modal",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"codes_page",
	"codes_page.insert",
	"codes_page.update",
	"codes_page.details",
	"payments_page",
	"payments_page.insert",
	"payments_page.update",
	"payments_page.details",
	"activations_page",
	"activations_page.insert",
	"activations_page.update",
	"activations_page.details",
	"activations_map",
	"blockchain",
	"partners",
	"partners.insert",
	"partners.update",
	"partners.details",
	"arc2_data_page",
	"arc2_data_page.details",
	"policies_page",
	"policies_page.insert",
	"policies_page.update",
	"policies_page.details",
	"policies_page.partner_policies_details",
	"audit_page",
	"contract_review_page",
	"contract_review_page.contract_review_detail",
	"payouts",
	"payouts.insert",
	"payouts.update",
	"payouts.details",
	"payouts_demo",
	"payouts_demo.insert",
	"payouts_demo.update",
	"payouts_demo.details",
	"group_policies",
	"group_policies.details"
];

Router.freeRoutes = [
	"home_public"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "admin.import_jobs",	roles: ["admin"] },
	{ route: "admin.import_jobs.insert",	roles: ["admin"] },
	{ route: "admin.import_jobs.update",	roles: ["admin"] },
	{ route: "admin.import_jobs.details",	roles: ["admin"] },
	{ route: "admin.logs_browser",	roles: ["admin"] },
	{ route: "admin.logs_server",	roles: ["admin"] },
	{ route: "admin.details_modal",	roles: ["admin"] },
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
	this.route("/dashboard", {name: "dashboard", title: "", controller: "DashboardController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/admin/import_jobs", {name: "admin.import_jobs", title: "", controller: "AdminImportJobsController"});
	this.route("/admin/import_jobs/insert", {name: "admin.import_jobs.insert", title: "", controller: "AdminImportJobsInsertController"});
	this.route("/admin/import_jobs/update/:importJobId", {name: "admin.import_jobs.update", title: "", controller: "AdminImportJobsUpdateController"});
	this.route("/admin/import_jobs/details/:importJobId", {name: "admin.import_jobs.details", title: "", controller: "AdminImportJobsDetailsController"});
	this.route("/admin/logs_browser", {name: "admin.logs_browser", title: "", controller: "AdminLogsBrowserController"});
	this.route("/admin/logs_server", {name: "admin.logs_server", title: "", controller: "AdminLogsServerController"});
	this.route("/admin/details_modal", {name: "admin.details_modal", title: "", controller: "AdminDetailsModalController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/codes_page", {name: "codes_page", title: "", controller: "CodesPageController"});
	this.route("/codes_page/insert", {name: "codes_page.insert", title: "", controller: "CodesPageInsertController"});
	this.route("/codes_page/update/:codeId", {name: "codes_page.update", title: "", controller: "CodesPageUpdateController"});
	this.route("/codes_page/details/:codeId", {name: "codes_page.details", title: "", controller: "CodesPageDetailsController"});
	this.route("/payments_page", {name: "payments_page", title: "", controller: "PaymentsPageController"});
	this.route("/payments_page/insert", {name: "payments_page.insert", title: "", controller: "PaymentsPageInsertController"});
	this.route("/payments_page/update/:paymentId", {name: "payments_page.update", title: "", controller: "PaymentsPageUpdateController"});
	this.route("/payments_page/details/:paymentId", {name: "payments_page.details", title: "", controller: "PaymentsPageDetailsController"});
	this.route("/activations_page", {name: "activations_page", title: "", controller: "ActivationsPageController"});
	this.route("/activations_page/insert", {name: "activations_page.insert", title: "", controller: "ActivationsPageInsertController"});
	this.route("/activations_page/update/:activationId", {name: "activations_page.update", title: "", controller: "ActivationsPageUpdateController"});
	this.route("/activations_page/details/:activationId", {name: "activations_page.details", title: "", controller: "ActivationsPageDetailsController"});
	this.route("/activations_map", {name: "activations_map", title: "", controller: "ActivationsMapController"});
	this.route("/blockchain", {name: "blockchain", title: "Connect to Wallet", controller: "BlockchainController"});
	this.route("/partners", {name: "partners", title: "", controller: "PartnersController"});
	this.route("/partners/insert", {name: "partners.insert", title: "", controller: "PartnersInsertController"});
	this.route("/partners/update/:partnerId", {name: "partners.update", title: "", controller: "PartnersUpdateController"});
	this.route("/partners/details/:partnerId/:mobile_num", {name: "partners.details", title: "", controller: "PartnersDetailsController"});
	this.route("/arc2_data_page", {name: "arc2_data_page", title: "", controller: "Arc2DataPageController"});
	this.route("/arc2_data_page/details/:arc2rowId", {name: "arc2_data_page.details", title: "", controller: "Arc2DataPageDetailsController"});
	this.route("/policies_page", {name: "policies_page", title: "", controller: "PoliciesPageController"});
	this.route("/policies_page/insert", {name: "policies_page.insert", title: "", controller: "PoliciesPageInsertController"});
	this.route("/policies_page/update/:policyId", {name: "policies_page.update", title: "", controller: "PoliciesPageUpdateController"});
	this.route("/policies_page/details/:policyId", {name: "policies_page.details", title: "", controller: "PoliciesPageDetailsController"});
	this.route("/policies_page/partner_policies_details/:policyId/:mobile_num/:partnerId", {name: "policies_page.partner_policies_details", title: "", controller: "PoliciesPagePartnerPoliciesDetailsController"});
	this.route("/audit_page", {name: "audit_page", title: "", controller: "AuditPageController"});
	this.route("/contract_review_page", {name: "contract_review_page", title: "", controller: "ContractReviewPageController"});
	this.route("/contract_review_page/contract_review_detail/:contractReviewId", {name: "contract_review_page.contract_review_detail", title: "", controller: "ContractReviewPageContractReviewDetailController"});
	this.route("/payouts", {name: "payouts", title: "", controller: "PayoutsController"});
	this.route("/payouts/insert", {name: "payouts.insert", title: "", controller: "PayoutsInsertController"});
	this.route("/payouts/update/:payoutId", {name: "payouts.update", title: "", controller: "PayoutsUpdateController"});
	this.route("/payouts/details/:payoutId", {name: "payouts.details", title: "", controller: "PayoutsDetailsController"});
	this.route("/payouts_demo", {name: "payouts_demo", title: "", controller: "PayoutsDemoController"});
	this.route("/payouts_demo/insert", {name: "payouts_demo.insert", title: "", controller: "PayoutsDemoInsertController"});
	this.route("/payouts_demo/update/:payout2Id", {name: "payouts_demo.update", title: "", controller: "PayoutsDemoUpdateController"});
	this.route("/payouts_demo/details/:payout2Id", {name: "payouts_demo.details", title: "", controller: "PayoutsDemoDetailsController"});
	this.route("/group_policies", {name: "group_policies", title: "Group Policies", controller: "GroupPoliciesController"});
	this.route("/group_policies/details/:groupPolicyId", {name: "group_policies.details", title: "Group Policies", controller: "GroupPoliciesDetailsController"});
});
