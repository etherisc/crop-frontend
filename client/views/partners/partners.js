Template.Partners.onCreated(function() {
	
});

Template.Partners.onDestroyed(function() {
	
});

Template.Partners.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Partners.events({
	
});

Template.Partners.helpers({
	
});

Template.PartnersHeader.created = function() {

};

Template.PartnersHeader.destroyed = function() {

};

Template.PartnersHeader.rendered = function() {

};

Template.PartnersHeader.helpers({

});

Template.PartnersHeader.events({

});


var PartnersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PartnerListPagedSearchString") || "",
		searchFields: Session.get("PartnerListPagedSearchFields") || ["id", "mpesa_name", "mobile_num", "is_signed", "tx_hash"],
		sortBy: Session.get("PartnerListPagedSortBy") || "",
		sortAscending: Session.get("PartnerListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("partnerListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PartnersView.onCreated(function() {
	
});

Template.PartnersView.onDestroyed(function() {
	
});

Template.PartnersView.onRendered(function() {
	Session.set("PartnersViewStyle", "table");
	
});

Template.PartnersView.events({
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
				Session.set("PartnerListPagedSearchString", searchString);
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
					Session.set("PartnerListPagedSearchString", searchString);
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
					Session.set("PartnerListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("partners.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PartnersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PartnersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PartnersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PartnersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PartnerListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PartnerListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PartnerListPagedPageNo") || 0;
		if(currentPage < this.partner_list_paged_page_count - 1) {
			Session.set("PartnerListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PartnersView.helpers({

	"insertButtonClass": function() {
		return Partners.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.partner_list_paged || this.partner_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.partner_list_paged && this.partner_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.partner_list_paged && this.partner_list_paged.count() == 0 && Session.get("PartnerListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PartnerListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PartnerListPagedPageNo") || 0) < this.partner_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PartnerListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PartnersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PartnersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PartnersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PartnersViewStyle") == "gallery";
	}

	
});


Template.PartnersViewTable.onCreated(function() {
	
});

Template.PartnersViewTable.onDestroyed(function() {
	
});

Template.PartnersViewTable.onRendered(function() {
	
});

Template.PartnersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PartnerListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PartnerListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PartnerListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PartnerListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PartnerListPagedSortAscending", true);
		}
	}
});

Template.PartnersViewTable.helpers({
});


Template.PartnersViewTableItems.onCreated(function() {
	
});

Template.PartnersViewTableItems.onDestroyed(function() {
	
});

Template.PartnersViewTableItems.onRendered(function() {
	
});

Template.PartnersViewTableItems.events({
	"click [data-action='sign']": function(e, t) {
e.preventDefault();

notarize(
	"Partner",                                  // type
	this.firstName + ' ' + this.lastName,       // message 
	this,                                       // payload
	"partnersUpdate"                             // updateMethod
);

return false;

},



	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("partners.details", mergeObjects(Router.currentRouteParams(), {partnerId: this._id, mobile_num: this.mobile_num}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("partnersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("partnersRemove", me._id, function(err, res) {
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
		Router.go("partners.update", mergeObjects(Router.currentRouteParams(), {partnerId: this._id}));
		return false;
	}
});

Template.PartnersViewTableItems.helpers({
	"isEnabledSign": function() {
return !!(!this.is_signed)
},


	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Partners.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Partners.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.PartnersFooter.created = function() {

};

Template.PartnersFooter.destroyed = function() {

};

Template.PartnersFooter.rendered = function() {

};

Template.PartnersFooter.helpers({

});

Template.PartnersFooter.events({

});
