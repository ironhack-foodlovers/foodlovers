const router = require("express").Router();
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

// Display site - "all restaurants"
router.get('/all', (req, res, next) => {
    Restaurant.find()
    .then(restaurantFromDB => {
        console.log('Restaurants werden angezeigt');
        res.render('restaurants/all', {restaurants: restaurantFromDB})
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

    const userId = req.session.user._id 

 //   console.log(req.session.user)

 User.findOne({ userId }).then((found) => { 

    res.render("restaurants/my-restaurants", { user: userId})
 })

/*   User.find({_id: userId})
	.then(userFromDB => {
		
        res.render("restaurants/my-restaurants", {users: user: userId})
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

module.exports = router;
