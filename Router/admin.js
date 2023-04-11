const express = require("express");
const { getAllVendors, getAllshopOwners } = require("../controllers/admin");
const router = express.Router();

router.get("/vendors",getAllVendors);
router.get("/shopOwners",getAllshopOwners);

module.exports = router;