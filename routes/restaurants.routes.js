const router = require("express").Router();
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const axios = require('axios').default;

const mapBoxAccessToken = 'pk.eyJ1IjoibWlzdHJhbGdyYXVlc3RlIiwiYSI6ImNsMmc2eGNsczAxNDczYnRwOXUyejd4OW4ifQ.2M96pYRBue81QqgxkqCjGw'

const newTags = [{  name: 'High Class'}, { name: 'Superior Breakfast'} , {  name: 'Craving Comfort Food'},
{ name: 'Coffee with Friends'}, { name:  'Date approved'}]

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

/* ----------------------------------------------------------------------------------------------------------------*/

// Display site - "all restaurants"
router.get('/all', isLoggedIn, (req, res, next) => {

    const user = req.user
    console.log(user)

    const liked = true;
  
    Restaurant.find()
    .then(restaurantFromDB => {
        console.log(liked)
        res.render('restaurants/all', {restaurants: restaurantFromDB, newTags: newTags, liked: liked, user: user})
    })
    .catch(err => {
        next(err)
    })
})

// Display site - "restaurant details"
router.get('/details/:id', (req, res, next) =>{
    const id = req.params.id
    Restaurant.findById(id)
    .then(restaurantFromDB => {
        res.render('restaurants/details', {restaurant: restaurantFromDB})
    })
    .catch(err => {
        next(err)
    })
})

router.post('/all/filtered', isLoggedIn, (req, res, next) => {
    const { filteredTags} = req.body

    Restaurant.find({tags: {$in: [filteredTags]}})
    .then(restaurantFromDB => {
        res.render('restaurants/all', {restaurants: restaurantFromDB, newTags: newTags, test:  filteredTags})
    })
    .catch(err => {
        next(err)
    })

})


router.get("/my-restaurants", isLoggedIn, (req, res, next) => {

    const userId = req.user._id
    const { filteredTags} = req.body

    console.log(userId)

    User.findById(userId)
    .populate('restaurants')
    .then(userFromDB => {
        console.log('Restaurants werden angezeigt');
        res.render('restaurants/my-restaurants', {restaurants: userFromDB.restaurants, newTags: newTags, test:  filteredTags})
    })
    .catch(err => {
        next(err)
    })
});

// 
router.post('/my-restaurants/filtered', isLoggedIn, (req, res, next) => {
    const { filteredTags} = req.body
    let restaurantsFiltered = []
    const userId = req.user._id

    User.findById(userId)
    .populate('restaurants')
    .then(userFromDB => {
        console.log(filteredTags)

        for(let i = 0; i<userFromDB.restaurants.length; i++) {

            console.log("out of if: ", userFromDB.restaurants[i].tags)

            if(userFromDB.restaurants[i].tags.includes(filteredTags)){
                restaurantsFiltered.push(userFromDB.restaurants[i])
            } 
        }
        res.render('restaurants/my-restaurants', {restaurants: restaurantsFiltered, newTags: newTags, test:  filteredTags})
    })
    .catch(err => {
        next(err)
    })
})

// Display site - "form to add new restaurant"
router.get('/all/add', (req, res, next) => {

    Restaurant.find()
    .then(restaurantFromDB => {
        res.render('restaurants/add-restaurant', {tags: newTags})
    })
    .catch(err => {
        next(err)
    })
})

// Add a new restaurant to global db"
router.post('/all',  isLoggedIn, (req, res, next) => {
    const {name, street, houseNumber, zipCode, city, country, telephone, url, tags, description} = req.body
    const liked = false;
    // take the individual address information and turn into URL-encoded UTF-8 string
    let restaurantaddress = encodeURI(`${street} ${houseNumber} ${zipCode} ${city} ${country}`)

    // request the forward geocoding api from mapbox & create the restaurant with the geo location
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${restaurantaddress}.json?access_token=${mapBoxAccessToken}`)
    .then(responseFromApi => {
        console.log(responseFromApi.data.features[0].center)
        const longLatRestaurant = responseFromApi.data.features[0].center

        Restaurant.create({
            name: name,
            street: street,
            houseNumber: houseNumber,
            zipCode: zipCode,
            city: city,
            country: country,
            geoCoordinates: longLatRestaurant,
            telephone: telephone,
            url: url,
            tags: tags,
            liked: liked,
            description: description
          })
        .then(restaurantFromDB => {
            console.log(restaurantFromDB);
            res.redirect('/all')
        })
        .catch(err => {
        next(err)
        })
    })
    .catch(error => console.log(error))
})

// Display site - "my restaurant"
router.get("/my-restaurants", (req, res, next) => {
    const userId = req.user._id
    User.findOne({ userId }).then((found) => { 
    res.render("restaurants/my-restaurants")
 })   
});

// Edit a restaurant in global db
router.get('/all/edit/:id',  isLoggedIn, (req, res, next) => { 
  
    const id = req.params.id
	Restaurant.findById(id)
		.then(restaurantFromDB => {
            console.log(restaurantFromDB, newTags)
			res.render('restaurants/edit-restaurant', { restaurant: restaurantFromDB, newTags: newTags})
		})
		.catch(err => {
			next(err)
		})
});

// Display site - "edit a restaurant"
router.post('/all/edit/:id',  isLoggedIn, (req, res, next) => {
    const {name, street, houseNumber, zipCode, city, country, telephone, url, tags, description} = req.body
    const id = req.params.id
    
    // take the individual address information and turn into URL-encoded UTF-8 string
    let restaurantaddress = encodeURI(`${street} ${houseNumber} ${zipCode} ${city} ${country}`)

    // request the forward geocoding api from mapbox & create the restaurant with the geo location
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${restaurantaddress}.json?access_token=${mapBoxAccessToken}`)
    .then(responseFromApi => {
        console.log(responseFromApi.data.features[0].center)
        const longLatRestaurant = responseFromApi.data.features[0].center

        Restaurant.findByIdAndUpdate(id, {
            name: name,
            street: street,
            houseNumber: houseNumber,
            zipCode: zipCode,
            city: city,
            country: country,
            geoCoordinates: longLatRestaurant,
            telephone: telephone,
            url: url,
            tags: tags,
            description: description
        }, { new: true })
        .then( () => {
            res.redirect('/all')
        })
        .catch(err => {
        next(err)
        })  
    })
})

// Add a restaurant to the users favorite lis ('my-restaurants')
router.get('/all/add-favorite/:id',  isLoggedIn, (req, res, next) => {
   
    const user = req.user
    const restaurantId = req.params.id

    console.log(user.restaurants)

// check if clicked on restaurant in order to add to favorites is already in my-restaurants 
if(!user.restaurants.includes(restaurantId)) {
    Restaurant.findByIdAndUpdate(restaurantId,  {liked: true })
    .then(restaurantFromDB => {
      User.findByIdAndUpdate(user._id, {
            $push: {restaurants: restaurantFromDB},    
        },)
        .then((updatedUser)=>{
            res.redirect('/my-restaurants')
        })
        .catch(err => {
            next(err)
        })
    })
} else {
    Restaurant.find()
    .then(restaurantFromDB => {
        console.log("Dieses restuarnat ist schon in der db")
        res.render('restaurants/all', {restaurants: restaurantFromDB,  message: 'This restaurant is already on your list', newTags: newTags })
    })
    .catch(err => {
        next(err)
    })
}
})


// Delete a restaurant
router.get('/all/delete/:id',  isLoggedIn, (req, res, next) =>{

    const id = req.params.id
    Restaurant.findByIdAndDelete(id)
    .then (() => {
        res.redirect('/all')
    })
    .catch(err => {
        next(err)
    })
})

/* --------------------------------------------- routes for Maps START -----------------------------------*/

// Get the restaurant data incl. the coordinates in a json format
router.get('/all/restaurant-data', (req, res, next) => {

    Restaurant.find()
    .then(restaurants => {
        res.json(restaurants)
        console.log(res.json(restaurants));
    })
    .catch(err => {
        next(err)
    })
})

// Get the "my-restaurants" data incl. the coordinates in a json format from the logged in user
router.get('/my-restaurants/restaurant-data', isLoggedIn, (req, res, next) => {
    const userId = req.user._id
    
    User.findById(userId)
    .populate('restaurants')
    .then(userFromDB => {
        res.json(userFromDB.restaurants)
        // console.log(res.json(userFromDB.restaurants));
    })
    .catch(err => {
        next(err)
    })    
})

// Get the restaurant data from the restaurant, which is displayed in the detail view
router.get('/details/restaurant-data/:id', (req, res, next) => {
    const id = req.params.id

    Restaurant.findById(id)
    .then(restaurants => {
        res.json(restaurants)
    })
    .catch(err => {
        next(err)
    })
})

/* --------------------------------------------- routes for Maps END -----------------------------------*/


router.get('/all/remove/:id',  isLoggedIn, (req, res, next) =>{
    const userId = req.user._id

    const restaurantId = req.params.id

   // console.log(req.user.restaurants)
    User.findById(userId)
    .then(userFromDB => {


       const filteredRestaurants =  userFromDB.restaurants.filter((restaurant) => {

            if(restaurant.toString() === restaurantId) {
             return false
            } else {
                return true
            }
    
        })


        userFromDB.restaurants = filteredRestaurants

        userFromDB.save()

        .then(savedObject => {
            Restaurant.findByIdAndUpdate(restaurantId,  {liked: false })
            .then(updatedLiked => {
                console.log(updatedLiked)
            })

            res.redirect('/my-restaurants')
        })
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;