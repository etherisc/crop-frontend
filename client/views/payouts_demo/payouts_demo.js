Template.PayoutsDemo.onCreated(function() {
	
});

Template.PayoutsDemo.onDestroyed(function() {
	
});

Template.PayoutsDemo.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsDemo.events({
	
});

Template.PayoutsDemo.helpers({
	
});


var PayoutsDemoViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("Payout2ListPagedSearchString") || "",
		searchFields: Session.get("Payout2ListPagedSearchFields") || ["name", "mobile_number", "sum_insured", "order_number", "value_chain", "start_date", "pixel", "end_date", "germ_wet_pay", "germ_dry_pay", "veg_wet_pay", "veg_dry_pay", "flower_pay", "excess_rain_pay"],
		sortBy: Session.get("Payout2ListPagedSortBy") || "",
		sortAscending: Session.get("Payout2ListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("payout2ListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PayoutsDemoView.onCreated(function() {
	
});

Template.PayoutsDemoView.onDestroyed(function() {
	
});

Template.PayoutsDemoView.onRendered(function() {
	Session.set("PayoutsDemoViewStyle", "table");
	
});

Template.PayoutsDemoView.events({
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
				Session.set("Payout2ListPagedSearchString", searchString);
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
					Session.set("Payout2ListPagedSearchString", searchString);
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
					Session.set("Payout2ListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("payouts_demo.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PayoutsDemoViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PayoutsDemoViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PayoutsDemoViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PayoutsDemoViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("Payout2ListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("Payout2ListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("Payout2ListPagedPageNo") || 0;
		if(currentPage < this.payout2list_paged_page_count - 1) {
			Session.set("Payout2ListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PayoutsDemoView.helpers({

	"insertButtonClass": function() {
		return Payouts2.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payout_2_list_paged || this.payout_2_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payout_2_list_paged && this.payout_2_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.payout_2_list_paged && this.payout_2_list_paged.count() == 0 && Session.get("Payout2ListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("Payout2ListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("Payout2ListPagedPageNo") || 0) < this.payout2list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("Payout2ListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PayoutsDemoViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PayoutsDemoViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PayoutsDemoViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PayoutsDemoViewStyle") == "gallery";
	}

	
});


Template.PayoutsDemoViewTable.onCreated(function() {
	
});

Template.PayoutsDemoViewTable.onDestroyed(function() {
	
});

Template.PayoutsDemoViewTable.onRendered(function() {
	
});

Template.PayoutsDemoViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("Payout2ListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("Payout2ListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("Payout2ListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("Payout2ListPagedSortAscending", !sortAscending);
		} else {
			Session.set("Payout2ListPagedSortAscending", true);
		}
	}
});

Template.PayoutsDemoViewTable.helpers({
});


Template.PayoutsDemoViewTableItems.onCreated(function() {
	
});

Template.PayoutsDemoViewTableItems.onDestroyed(function() {
	
});

Template.PayoutsDemoViewTableItems.onRendered(function() {
	
});

Template.PayoutsDemoViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("payouts_demo.details", mergeObjects(Router.currentRouteParams(), {payout2Id: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("payouts2Update", this._id, values, function(err, res) {
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
						Meteor.call("payouts2Remove", me._id, function(err, res) {
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
		Router.go("payouts_demo.update", mergeObjects(Router.currentRouteParams(), {payout2Id: this._id}));
		return false;
	}
});

Template.PayoutsDemoViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Payouts2.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Payouts2.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
