const router = require("express").Router();
const Restaurant = require('../models/Restaurant');

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
    res.render("restaurants/my-restaurants");
  });


module.exports = router;