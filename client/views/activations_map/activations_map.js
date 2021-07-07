Template.ActivationsMap.onCreated(function() {
	
});

Template.ActivationsMap.onDestroyed(function() {
	
});

Template.ActivationsMap.onRendered(function() {
	Meteor.subscribe('record_count_list');
Meteor.subscribe('location_list');
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

		const drawRectangles = () => {

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
				// console.log(xmin(), ymin(), xmax(), ymax());
				// console.log(map.getCenter());
				if (xmax() - xmin() > 13 || ymax() - ymin() > 9) {
					console.log('too many', xmax()-xmin(), ymax()-ymin()); 
					return;
				}

				const xmi = Math.round(xmin() * 10); 
				const ymi = Math.round(ymin() * 10);
				const xma = Math.round(xmax() * 10);
				const yma = Math.round(ymax() * 10);

				for (let lat = ymi; lat <= yma; lat += 1) {
					for (let lng = xmi; lng <= xma; lng += 1) {
						const pixel = `Pixel${latLng2Pixel({lat: lat/10, lng: lng/10})}`;
						const counts = RecordCounts.findOne({pixel});
						if (counts) {
							const op = (counts.count)/1400 + 0.4 > 0.9 ? 0.9 : (counts.count)/1400 + 0.4;
							const rectangle = new google.maps.Rectangle({
								strokeColor: "#FFFFFF",
								strokeOpacity: 0.5,
								strokeWeight: 1, 
								fillColor: "#FF0000", 
								fillOpacity: op, 
								map,
								bounds: {
									north: (lat/10) + 0.05,
									south: (lat/10) - 0.05,
									east: (lng/10) + 0.05,
									west: (lng/10) - 0.05,
								}, 
							});

							const latlng = new google.maps.LatLng(lat/10, lng/10);
							const customTxt = `${pixel}${counts ? `<br />${counts.count}`: ''}`;
							const txt = new TxtOverlay(latlng, customTxt, "gmlp-textbox", map)

							rectangles.push({rectangle, txt});
						} else {
							let loc = Locations.findOne({pixel});
							if (loc  && loc.site_table_exists) {
								const circle = new google.maps.Circle({
									strokeColor: "#FFFFFF",
									strokeOpacity: 0.8,
									strokeWeight: 2,
									fillColor: "#6699ff",
									fillOpacity: 0.45,
									map,
									center: new google.maps.LatLng(lat/10, lng/10),
									radius: 5000, // meters
								});
							}
						}
					}
				}
			}, 1000);				
		};

		map.addListener("bounds_changed", drawRectangles);
		drawRectangles();

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
				center: new google.maps.LatLng(-0.67, 36.42),
				zoom: 8 
			};
		}
	}
});

Template.ActivationsMapMap.events({
	"click #btn-reload": function (e,t) {
		e.preventDefault();

		Meteor.call('countActivations');
	}

});
