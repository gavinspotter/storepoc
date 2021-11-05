const express = require("express")

const customerController = require("../controllers/consumer-controller")

const checkAuth = require('../middleware/customer-check-auth');


const router = express.Router()

router.post("/signup", customerController.signup)

router.post("/login", customerController.login)



router.use(checkAuth);

module.exports = router