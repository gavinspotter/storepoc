const express = require("express")

const customerController = require("../controllers/consumer-controller")

const checkAuth = require('../middleware/customer-check-auth');


const router = express.Router()

router.post("/signup", customerController.signup)

router.post("/login", customerController.login)



router.use(checkAuth);



router.patch("/updateDetails", customerController.editDeliveryDetails )


router.get("/getMessages", customerController.getMessages)



router.post("/postMessage", customerController.createAMessage)

router.post("/createMessageBoard", customerController.createMessages)


module.exports = router