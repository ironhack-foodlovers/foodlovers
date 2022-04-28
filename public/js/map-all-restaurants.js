mapboxgl.accessToken = 'pk.eyJ1IjoibWlzdHJhbGdyYXVlc3RlIiwiYSI6ImNsMmc2eGNsczAxNDczYnRwOXUyejd4OW4ifQ.2M96pYRBue81QqgxkqCjGw';

// get all the id's from the restaurants (all, or if filtered then only the filtered)
const nodeArr = document.querySelectorAll(".restaurant-object-id")
const idArr = []

// extract only the restaurant object ID's from the node object and push it into an array
nodeArr.forEach( object => {
    idArr.push(object.innerHTML)
})
// console.log(idArr);

// make a new map
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/mapbox/light-v10', // style URL
	center: [13.404954, 52.520008], // starting position [lng, lat]
	zoom: 11, // starting zoom
	// pitch: 100
});

// hand over the array to the server (= the router.post funtion) and wait for the return
axios.post('/restaurant-data', {
    idArr: idArr
  })
  // the server returned an array with all the restaurant object, now we can map over them and draw the markers on the map
  .then(restaurants => {

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
            color: '#0A385C',
        })
        .setLngLat(coord)
        .setPopup(popup)
        .addTo(map)
        })
    })
  .catch(function (error) {
    console.log(error);
  });

//add navigation bar in map to top left corner
const nav = new mapboxgl.NavigationControl()
map.addControl(nav, 'top-left')


// const map = new mapboxgl.Map({
// 	container: 'map', // container ID
// 	style: 'mapbox://styles/mapbox/light-v10', // style URL
// 	center: [13.404954, 52.520008], // starting position [lng, lat]
// 	zoom: 11, // starting zoom
// 	// pitch: 100
// });

// // gets all the restaurants data 
// axios.get('/all/restaurant-data')
//     .then(restaurants => {

//         restaurants.data.forEach(restaurant => {
//             const coord = restaurant.geoCoordinates
//             // create the popup
//             const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//             restaurant.name
//             );

//             // create DOM element for the marker
//             const el = document.createElement('div');
//             el.id = 'marker';

//             // create the marker on map
//             new mapboxgl.Marker({
//                 color: '#0A385C',
//             })
//             .setLngLat(coord)
//             .setPopup(popup)
//             .addTo(map)
//         })
// })

// //add navigation bar in map to top left corner
// const nav = new mapboxgl.NavigationControl()
// map.addControl(nav, 'top-left')