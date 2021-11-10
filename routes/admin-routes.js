
const express = require("express")

const adminController = require("../controllers/admin-controller")

const checkAuth = require('../middleware/check-auth');





const router = express.Router()

router.post("/signup", adminController.signup)

router.post("/login", adminController.login)

router.get("/getBulk", adminController.getBulkItems)

router.get("/getConsumerItems", adminController.getConsumerItems)



router.use(checkAuth);



router.get("/getMessages", adminController.getMessages)


router.post("/postMessage", adminController.createAMessage)


router.post("/createConsumerItem", adminController.createConsumerItem)

router.post("/createBulkItem", adminController.createBulkItem)



router.patch("/editMessage", adminController.editMessage)

router.patch("/updateConsumerItem", adminController.updateConsumerItem)

router.patch("/updateBulk", adminController.updateBulkItem)

router.delete("/deleteBulk/:bulkId", adminController.deleteBulkItem)

router.delete("/deleteConsumerItem/:itemId", adminController.deleteConsumerItem)




module.exports = router