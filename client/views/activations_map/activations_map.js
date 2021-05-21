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

	GoogleMaps.ready('activationsMap', function({instance: map, options}) {

		let timer;
		map.addListener("bounds_changed", () => {

			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				var bounds = map.getBounds();
				const {lat: ymin, lng: xmin} = bounds.getSouthWest();
				const {lat: ymax, lng: xmax} = bounds.getNorthEast();

				for (let lat = ymin; lat <= ymax; lat += 0.1) {
					for (let lng = xmin(); lng <= xmax(); lng += 0.1) {
						const pixel = `Pixel${latLng2Pixel({lat, lng})}`;
						const activation = Activations.findOne({pixel});
						if (activation) {
							const rectangle = new google.maps.Rectangle({
								strokeColor: "#FF0000",
								strokeOpacity: 0.8,
								strokeWeight: 1,
								fillColor: "#FF0000",
								fillOpacity: 0.35,
								map,
								bounds: {
									north: lat + 0.05,
									south: lat - 0.05,
									east: lng + 0.05,
									west: lng - 0.05,
								},
							});
							const latlng = new google.maps.LatLng(lat, lng);
							const customTxt = `<div>${pixel}</div>`;
							const txt = new TxtOverlay(latlng, customTxt, "gmlp-textbox", map)
						}
					}
				}
			}, 1000);				
		});

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
