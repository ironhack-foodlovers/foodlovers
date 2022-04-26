const router = require("express").Router();
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');

router.get('/all', (req, res, next) => {
    console.log('TERERSDFSDFDS');
    Restaurant.find()
    .then(restaurantFromDB => {
        console.log('Restaurants werden angezeigt');
        res.render('restaurants/all', {restaurants: restaurantFromDB})
    })
    .catch(err => {
        next(err)
    })
})

router.get('/all/add', (req, res, next) => {
    console.log('rendern klappt');
    res.render('restaurants/add-restaurant')
  })

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


module.exports = router;