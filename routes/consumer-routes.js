const express = require("express")

const customerController = require("../controllers/consumer-controller")

const checkAuth = require('../middleware/customer-check-auth');


const router = express.Router()

router.post("/signup", customerController.signup)

router.post("/login", customerController.login)

router.post("/purchaseGood", customerController.purchaseConsumerGood)



router.use(checkAuth);

router.get("/getCustomer")



router.patch("/updateDetails", customerController.editDeliveryDetails )


router.post("/buyItemOnAccount", customerController.purchaseConsumerGoodOnAccount)

router.get("/getMessages", customerController.getMessages)

router.get("/items", customerController.getItems)



router.post("/postMessage", customerController.createAMessage)

router.post("/createMessageBoard", customerController.createMessages)


module.exports = router