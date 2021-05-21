Template.PaymentsPage.onCreated(function() {
	
});

Template.PaymentsPage.onDestroyed(function() {
	
});

Template.PaymentsPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PaymentsPage.events({
	
});

Template.PaymentsPage.helpers({
	
});

Template.PaymentsPageHeader.created = function() {

};

Template.PaymentsPageHeader.destroyed = function() {

};

Template.PaymentsPageHeader.rendered = function() {

};

Template.PaymentsPageHeader.helpers({

});

Template.PaymentsPageHeader.events({

});


var PaymentsPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PaymentListPagedSearchString") || "",
		searchFields: Session.get("PaymentListPagedSearchFields") || ["mobile_num", "call_time", "mpesa_code", "mpesa_name", "order_number", "amount_paid"],
		sortBy: Session.get("PaymentListPagedSortBy") || "",
		sortAscending: Session.get("PaymentListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("paymentListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PaymentsPageView.onCreated(function() {
	
});

Template.PaymentsPageView.onDestroyed(function() {
	
});

Template.PaymentsPageView.onRendered(function() {
	Session.set("PaymentsPageViewStyle", "table");
	
});

Template.PaymentsPageView.events({
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
				Session.set("PaymentListPagedSearchString", searchString);
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
					Session.set("PaymentListPagedSearchString", searchString);
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
					Session.set("PaymentListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("payments_page.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PaymentsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PaymentsPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PaymentsPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PaymentsPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PaymentListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PaymentListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PaymentListPagedPageNo") || 0;
		if(currentPage < this.payment_list_paged_page_count - 1) {
			Session.set("PaymentListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PaymentsPageView.helpers({

	"insertButtonClass": function() {
		return Payments.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payment_list_paged || this.payment_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payment_list_paged && this.payment_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.payment_list_paged && this.payment_list_paged.count() == 0 && Session.get("PaymentListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PaymentListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PaymentListPagedPageNo") || 0) < this.payment_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PaymentListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PaymentsPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PaymentsPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PaymentsPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PaymentsPageViewStyle") == "gallery";
	}

	
});


Template.PaymentsPageViewTable.onCreated(function() {
	
});

Template.PaymentsPageViewTable.onDestroyed(function() {
	
});

Template.PaymentsPageViewTable.onRendered(function() {
	
});

Template.PaymentsPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PaymentListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PaymentListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PaymentListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PaymentListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PaymentListPagedSortAscending", true);
		}
	}
});

Template.PaymentsPageViewTable.helpers({
});


Template.PaymentsPageViewTableItems.onCreated(function() {
	
});

Template.PaymentsPageViewTableItems.onDestroyed(function() {
	
});

Template.PaymentsPageViewTableItems.onRendered(function() {
	
});

Template.PaymentsPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("payments_page.details", mergeObjects(Router.currentRouteParams(), {paymentId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("paymentsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("paymentsRemove", me._id, function(err, res) {
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
		Router.go("payments_page.update", mergeObjects(Router.currentRouteParams(), {paymentId: this._id}));
		return false;
	}
});

Template.PaymentsPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Payments.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Payments.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PaymentsPageFooter.created = function() {

};

Template.PaymentsPageFooter.destroyed = function() {

};

Template.PaymentsPageFooter.rendered = function() {

};

Template.PaymentsPageFooter.helpers({

});

Template.PaymentsPageFooter.events({

});
