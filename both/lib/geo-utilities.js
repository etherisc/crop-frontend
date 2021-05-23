round = (num, places) => Math.round(Math.sign(num) * (Math.abs(num) + Number.EPSILON) * 10**places) / 10**places;

latLng2Pixel = ({ lat, lng }) => Math.round((Math.round(lat * 10) + 401) * 1000 + Math.round(lng * 10) + 201);
latLng2PixelStr = ({ lat, lng }) => `Pixel${latLng2Pixel({lat, lng})}`;

pixel2LatLng = ( pixel ) => ({
     lat: ( ( pixel - trunc( pixel / 1000 ) * 1000 ) / 10 ) - 20.1,
     lng: ( trunc( pixel / 1000 ) / 10 ) - 40.1
});

