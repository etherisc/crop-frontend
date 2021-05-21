Template.ContractReviewPage.onCreated(function() {
	
});

Template.ContractReviewPage.onDestroyed(function() {
	
});

Template.ContractReviewPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContractReviewPage.events({
	
});

Template.ContractReviewPage.helpers({
	
});

Template.ContractReviewPageHeader.created = function() {

};

Template.ContractReviewPageHeader.destroyed = function() {

};

Template.ContractReviewPageHeader.rendered = function() {

};

Template.ContractReviewPageHeader.helpers({

});

Template.ContractReviewPageHeader.events({

});


var ContractReviewPageContractReviewViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ContractReviewListPagedSearchString") || "",
		searchFields: Session.get("ContractReviewListPagedSearchFields") || ["value_chain", "Contract", "StartDay", "ContractEndDate", "GermDryPayPct", "GermWetPayPct", "VegDryPayPct", "FlowerPayPct", "ExcessRainPayPct", "SumInsured", "TotalPayPct", "ActualPayPct", "ActualPay"],
		sortBy: Session.get("ContractReviewListPagedSortBy") || "",
		sortAscending: Session.get("ContractReviewListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("contractReviewListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.ContractReviewPageContractReviewView.onCreated(function() {
	
});

Template.ContractReviewPageContractReviewView.onDestroyed(function() {
	
});

Template.ContractReviewPageContractReviewView.onRendered(function() {
	Session.set("ContractReviewPageContractReviewViewStyle", "table");
	
});

Template.ContractReviewPageContractReviewView.events({
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
				Session.set("ContractReviewListPagedSearchString", searchString);
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
					Session.set("ContractReviewListPagedSearchString", searchString);
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
					Session.set("ContractReviewListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ContractReviewPageContractReviewViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ContractReviewPageContractReviewViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ContractReviewPageContractReviewViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ContractReviewPageContractReviewViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ContractReviewListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ContractReviewListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ContractReviewListPagedPageNo") || 0;
		if(currentPage < this.contract_review_list_paged_page_count - 1) {
			Session.set("ContractReviewListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.ContractReviewPageContractReviewView.helpers({

	"insertButtonClass": function() {
		return ContractReview.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.contract_review_list_paged || this.contract_review_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.contract_review_list_paged && this.contract_review_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.contract_review_list_paged && this.contract_review_list_paged.count() == 0 && Session.get("ContractReviewListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ContractReviewListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ContractReviewListPagedPageNo") || 0) < this.contract_review_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ContractReviewListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("ContractReviewPageContractReviewViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("ContractReviewPageContractReviewViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("ContractReviewPageContractReviewViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("ContractReviewPageContractReviewViewStyle") == "gallery";
	}

	
});


Template.ContractReviewPageContractReviewViewTable.onCreated(function() {
	
});

Template.ContractReviewPageContractReviewViewTable.onDestroyed(function() {
	
});

Template.ContractReviewPageContractReviewViewTable.onRendered(function() {
	
});

Template.ContractReviewPageContractReviewViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ContractReviewListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ContractReviewListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ContractReviewListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ContractReviewListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ContractReviewListPagedSortAscending", true);
		}
	}
});

Template.ContractReviewPageContractReviewViewTable.helpers({
});


Template.ContractReviewPageContractReviewViewTableItems.onCreated(function() {
	
});

Template.ContractReviewPageContractReviewViewTableItems.onDestroyed(function() {
	
});

Template.ContractReviewPageContractReviewViewTableItems.onRendered(function() {
	
});

Template.ContractReviewPageContractReviewViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("contract_review_page.contract_review_detail", mergeObjects(Router.currentRouteParams(), {contractReviewId: this._id._str}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("contractReviewUpdate", this._id, values, function(err, res) {
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
						Meteor.call("contractReviewRemove", me._id, function(err, res) {
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
		/**/
		return false;
	}
});

Template.ContractReviewPageContractReviewViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ContractReview.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ContractReview.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
