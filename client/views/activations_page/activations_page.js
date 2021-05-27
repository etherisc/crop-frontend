Template.ActivationsPage.onCreated(function() {
	
});

Template.ActivationsPage.onDestroyed(function() {
	
});

Template.ActivationsPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ActivationsPage.events({
	
});

Template.ActivationsPage.helpers({
	
});

Template.ActivationsPageActivationsAggregates.created = function() {

};

Template.ActivationsPageActivationsAggregates.destroyed = function() {

};

Template.ActivationsPageActivationsAggregates.rendered = function() {
	
	const filter = this.data.activation_list_paged.matcher._selector;

	const aggregate = Meteor.call("activation_aggregates", filter, (err, res) => {

		const fmt = (number) => Intl.NumberFormat('us-US', {style: 'currency', currency: 'KES' }).format(number);
		
		if (res) {
			Session.set('activation_aggregates', {
				amount: fmt(res.amount),
				activations: res.activations
			});
		}
		
	});
};

Template.ActivationsPageActivationsAggregates.helpers({
	"aggregates": () => {
		return Session.get('activation_aggregates');
	}
});

Template.ActivationsPageActivationsAggregates.events({

});


var ActivationsPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ActivationListPagedSearchString") || "",
		searchFields: Session.get("ActivationListPagedSearchFields") || ["mobile_num", "call_time", "latitude", "longitude", "order_number", "activation_code", "value_chain", "amount_premium", "pixel"],
		sortBy: Session.get("ActivationListPagedSortBy") || "",
		sortAscending: Session.get("ActivationListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("activationListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ActivationsPageView.onCreated(function() {
	
});

Template.ActivationsPageView.onDestroyed(function() {
	
});

Template.ActivationsPageView.onRendered(function() {
	Session.set("ActivationsPageViewStyle", "table");
	
});

Template.ActivationsPageView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("ActivationListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("ActivationListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("ActivationListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("activations_page.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ActivationsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ActivationsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ActivationsPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ActivationsPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ActivationListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ActivationListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ActivationListPagedPageNo") || 0;
		if(currentPage < this.activation_list_paged_page_count - 1) {
			Session.set("ActivationListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ActivationsPageView.helpers({

	"insertButtonClass": function() {
		return Activations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.activation_list_paged || this.activation_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.activation_list_paged && this.activation_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.activation_list_paged && this.activation_list_paged.count() == 0 && Session.get("ActivationListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ActivationListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ActivationListPagedPageNo") || 0) < this.activation_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ActivationListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ActivationsPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ActivationsPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ActivationsPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ActivationsPageViewStyle") == "gallery";
	}

	
});


Template.ActivationsPageViewTable.onCreated(function() {
	
});

Template.ActivationsPageViewTable.onDestroyed(function() {
	
});

Template.ActivationsPageViewTable.onRendered(function() {
	
});

Template.ActivationsPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ActivationListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ActivationListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ActivationListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ActivationListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ActivationListPagedSortAscending", true);
		}
	}
});

Template.ActivationsPageViewTable.helpers({
});


Template.ActivationsPageViewTableItems.onCreated(function() {
	
});

Template.ActivationsPageViewTableItems.onDestroyed(function() {
	
});

Template.ActivationsPageViewTableItems.onRendered(function() {
	
});

Template.ActivationsPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("activations_page.details", mergeObjects(Router.currentRouteParams(), {activationId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("activationsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("activationsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("activations_page.update", mergeObjects(Router.currentRouteParams(), {activationId: this._id}));
		return false;
	}
});

Template.ActivationsPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Activations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Activations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.ActivationsPageViewCustomActions.created = function() {

};

Template.ActivationsPageViewCustomActions.destroyed = function() {

};

Template.ActivationsPageViewCustomActions.rendered = function() {

};

Template.ActivationsPageViewCustomActions.helpers({

});

Template.ActivationsPageViewCustomActions.events({
	"click #btn-export": function (e,t) {
		e.preventDefault();
		const filter = t.data.activation_list_paged.matcher._selector;

		Meteor.call('activations_export', filter);
		toast_info('Contract Review started');
	}

});
