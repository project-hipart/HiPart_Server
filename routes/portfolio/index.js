var express = require('express');
var router = express.Router();

router.use("/creator", require("./creator"));
router.use("/editor", require("./editor"));
router.use("/translator", require("./translator"));
router.use("/etc", require("./etc"));
router.use("/detail", require("./detail"));


module.exports = router;