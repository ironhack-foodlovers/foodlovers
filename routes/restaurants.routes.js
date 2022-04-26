const router = require("express").Router();
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');


const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Display site - "all restaurants"
router.get('/all', isLoggedIn, (req, res, next) => {
    Restaurant.find()
    .then(restaurantFromDB => {
        console.log('Restaurants werden angezeigt');
        res.render('restaurants/all', {restaurants: restaurantFromDB, status: false})
    })
    .catch(err => {
        next(err)
    })
})

// Display site - "form to add new restaurant"
router.get('/all/add', (req, res, next) => {
    res.render('restaurants/add-restaurant')
})

// Add a new restaurant to global db"
router.post('/all', (req, res, next) => {
    const {name, street, houseNumber, zipCode, city, country, telephone, url, tags, description} = req.body
    Restaurant.create({
        name: name,
        street: street,
        houseNumber: houseNumber,
        zipCode: zipCode,
        city: city,
        country: country,
        telephone: telephone,
        url: url,
        tags: tags,
        description: description
      })
    .then(restaurantFromDB => {
    
    res.redirect('/all')
    })
    .catch(err => {
    next(err)
    })
})

router.get("/my-restaurants", (req, res, next) => {

    const userId = req.user._id

console.log(userId)

User.findById(userId)
.populate('restaurants')
.then(userFromDB => {
    console.log('Restaurants werden angezeigt');
    res.render('restaurants/my-restaurants', {restaurants: userFromDB.restaurants})
})
.catch(err => {
    next(err)
})

/*  Restaurant.find()
 .then(restaurantFromDB => {
     console.log('Restaurants werden angezeigt');
     res.render('restaurants/my-restaurants', {restaurants: restaurantFromDB, status: false})
 })
 .catch(err => {
     next(err)
 }) */
});

// Edit a restaurant in global db
router.get('/all/edit/:id', (req, res, next) => {
    const id = req.params.id
	Restaurant.findById(id)
		.then(restaurantFromDB => {
			res.render('restaurants/edit-restaurant', { restaurant: restaurantFromDB })
		})
		.catch(err => {
			next(err)
		})
});

// Display site - "edit a restaurant"
router.post('/all/edit/:id', (req, res, next) => {
    const {name, street, houseNumber, zipCode, city, country, telephone, url, tags, description} = req.body
    const id = req.params.id
    Restaurant.findByIdAndUpdate(id, {
        name: name,
        street: street,
        houseNumber: houseNumber,
        zipCode: zipCode,
        city: city,
        country: country,
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

// Add a restaurant to the users favorite lis ('my-restaurants')
router.get('/all/add-favorite/:id', (req, res, next) => {
   
    const userId = req.session.passport.user
    const restaurantId = req.params.id

    Restaurant.findById(restaurantId)
    .then(restaurantFromDB => {


 User.findByIdAndUpdate(userId, {

            $push: {restaurants: restaurantFromDB} 
        })
        .then((updatedUser)=>{
            res.redirect('/my-restaurants')
        })
        .catch(err => {
            next(err)
        })
    })
})

router.get('/all/delete/:id', (req, res, next) =>{
    const id = req.params.id
    Restaurant.findByIdAndDelete(id)
    .then (() => {
        res.redirect('/all')
    })
    .catch(err => {
        next(err)
    })
})

router.get('/all/remove/:id', (req, res, next) =>{
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

        console.log(filteredRestaurants)

        userFromDB.restaurants = filteredRestaurants

        userFromDB.save()

        .then(savedObject => {
            console.log(savedObject)
            res.redirect('/my-restaurants')
        })

      /*   User.findById(userId, {

            $pull: {restaurants: userFromDB.restaurants} 
        }) */
    
       
    })
    .catch(err => {
        next(err)
    })
})


module.exports = router;
