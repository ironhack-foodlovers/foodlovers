mapboxgl.accessToken = 'pk.eyJ1IjoibWlzdHJhbGdyYXVlc3RlIiwiYSI6ImNsMmc2eGNsczAxNDczYnRwOXUyejd4OW4ifQ.2M96pYRBue81QqgxkqCjGw';

const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/dark-v10', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 11, // starting zoom
	// pitch: 100
});

// gets all the restaurants data 
axios.get('/my-restaurants/restaurant-data')
    .then(restaurants => {
        console.log(restaurants);
        restaurants.data.forEach(restaurant => {
            const coord = restaurant.geoCoordinates
            // create the popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            restaurant.name
            );

            // create DOM element for the marker
            const el = document.createElement('div');
            el.id = 'marker';

            // create the marker on map
            new mapboxgl.Marker({
                color: '#7F200B',
            })
            .setLngLat(coord)
            .setPopup(popup)
            .addTo(map)
        })
})

//add navigation bar in map to top left corner
const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')