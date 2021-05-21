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

	GoogleMaps.ready('activationsMap', function({map, options}) {
		
		var marker = new google.maps.Marker({
			position: options.center,
			map
		});

		const rectangle = new google.maps.Rectangle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 1,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map,
			bounds: {
				north: 0.05,
				south: -0.05,
				east: 35.05,
				west: 34.95,
			},
		});

		const latlng = new google.maps.LatLng(0.0, 34.975);
		const customTxt = "<div>123456</div>"
		const txt = new TxtOverlay(latlng, customTxt, "gmlp-textbox", map)

		// var bounds = map.getBounds();
		console.log(map);
//		var ne = bounds.getNorthEast(); // LatLng of the north-east corner
//		var sw = bounds.getSouthWest(); // LatLng of the south-west corder


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
				zoom: 8
			};
		}
	}
});

Template.ActivationsMapMap.events({

});
