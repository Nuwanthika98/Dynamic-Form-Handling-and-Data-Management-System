const router = require("express").Router();

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.use("/form", require('../src/form/form.router'));

module.exports = router;