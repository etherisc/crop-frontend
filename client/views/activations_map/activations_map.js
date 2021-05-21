Template.ActivationsMap.onCreated(function() {
	
});

Template.ActivationsMap.onDestroyed(function() {
	
});

Template.ActivationsMap.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ActivationsMap.events({
	
});

Template.ActivationsMap.helpers({
	
});

Template.ActivationsMapMap.created = function() {

	GoogleMaps.ready('activationsMap', function(map) {
		var marker = new google.maps.Marker({
			position: map.options.center,
			map: map.instance
		});

		const rectangle = new google.maps.Rectangle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map: map.instance,
			bounds: {
				north: 0.05,
				south: -0.05,
				east: 35.05,
				west: 34.95,
			},
		});

		const latlng = new google.maps.LatLng(0.0, 35.0);
		const customTxt = "<div>123456</div>"
		const txt = new TxtOverlay(latlng, customTxt, "gmlp-textbox", map.instance)



		});
};

Template.ActivationsMapMap.destroyed = function() {

};

Template.ActivationsMapMap.rendered = function() {

};

Template.ActivationsMapMap.helpers({
	activationsMapOptions: function() {
		// Make sure the maps API has loaded
		if (GoogleMaps.loaded()) {
			// Map initialization options
			return {
				center: new google.maps.LatLng(0.0, 37.0),
				zoom: 10
			};
		}
	}
});

Template.ActivationsMapMap.events({

});
