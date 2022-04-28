const router = require("express").Router();



/* GET home page */
router.get("/", (req, res, next) => {

  const user = req.user
  res.render("index", {user: user});
 

});

module.exports = router;
