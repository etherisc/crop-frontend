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
		map.addListener("bounds_changed", () => {

			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				var bounds = map.getBounds();
				const {lat: ymin, lng: xmin} = bounds.getSouthWest();
				const {lat: ymax, lng: xmax} = bounds.getNorthEast();
				//console.log(xmin(), ymin(), xmax(), ymax());
				if (ymax() - ymin() > 1 || xmax() - xmin() > 1) {
					console.log('too many');
					return;
				}
				const xmi = round(xmin(), 1);
				const ymi = round(ymin(), 1);
				const xma = round(xmax(), 1);
				const yma = round(ymax(), 1);
				for (let lat = ymi; lat <= yma; lat += 0.1) {
					for (let lng = xmi; lng <= xma; lng += 0.1) {
						const pixel = `Pixel${latLng2Pixel({lat, lng})}`;
						console.log(pixel);
						const activation = true; //Activations.findOne({pixel});
						if (activation) {
							console.log('Found!');
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
