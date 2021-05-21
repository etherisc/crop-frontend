Template.ActivationsMap.onCreated(function() {
	
});

Template.ActivationsMap.onDestroyed(function() {
	
});

Template.ActivationsMap.onRendered(function() {
	Meteor.subscribe('activation_list');
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
		let rectangles = [];

		map.addListener("bounds_changed", () => {

			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(() => {


				if (rectangles) {
					rectangles.forEach(({rectangle, txt}) => {
						rectangle.setMap(null);
						rectangle = null;
						txt.setMap(null);
						txt = null;
					});
					rectangles = [];
				}

				var bounds = map.getBounds();
				const {lat: ymin, lng: xmin} = bounds.getSouthWest();
				const {lat: ymax, lng: xmax} = bounds.getNorthEast();
				//console.log(xmin(), ymin(), xmax(), ymax());
				if (ymax() - ymin() > 2 || xmax() - xmin() > 2) {
					console.log('too many');
					return;
				}

				const xmi = Math.round(xmin() * 10);
				const ymi = Math.round(ymin() * 10);
				const xma = Math.round(xmax() * 10);
				const yma = Math.round(ymax() * 10);

				for (let lat = ymi; lat <= yma; lat += 1) {
					for (let lng = xmi; lng <= xma; lng += 1) {
						const pixel = `Pixel${latLng2Pixel({lat: lat/10, lng: lng/10})}`;
						///console.log(pixel, lat/10, lng/10);
						const activation = Activations.findOne({pixel});
						const bg = activation ? "#FF0000" : "";
						//console.log('Found!');
						const rectangle = new google.maps.Rectangle({
							strokeColor: "#FF0000",
							strokeOpacity: 0.8,
							strokeWeight: 1,
							fillColor: bg,
							fillOpacity: 0.35,
							map,
							bounds: {
								north: (lat/10) + 0.05,
								south: (lat/10) - 0.05,
								east: (lng/10) + 0.05,
								west: (lng/10) - 0.05,
							},
						});

						const latlng = new google.maps.LatLng(lat/10, lng/10-0.25);
						const customTxt = `<div>${pixel}</div>`;
						const txt = new TxtOverlay(latlng, customTxt, "gmlp-textbox", map)

						rectangles.push({rectangle, txt});


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
