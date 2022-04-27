mapboxgl.accessToken = 'pk.eyJ1IjoibWlzdHJhbGdyYXVlc3RlIiwiYSI6ImNsMmc2eGNsczAxNDczYnRwOXUyejd4OW4ifQ.2M96pYRBue81QqgxkqCjGw';

// get the object id from the hidden html element in the details.hbd view
let id = document.getElementById("restaurant-object-id").innerHTML

// gets the restaurants data from the one selected in the restaurant detail view
// map zooms in on the restaurant with higher zoom
axios.get(`/details/restaurant-data/${id}`)
    .then(restaurant => {
        
        const coord = restaurant.data.geoCoordinates

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/dark-v10', // style URL
            center: coord, // starting position [lng, lat]
            zoom: 15, // starting zoom
            // pitch: 100
        });
        
        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        restaurant.data.name
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

        //add navigation bar in map to top left corner
        const nav = new mapboxgl.NavigationControl()
        map.addControl(nav, 'top-left')
})

