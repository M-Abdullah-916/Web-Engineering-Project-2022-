const express = require("express");
const router = express.Router();

const poem_controller = require("../controllers/poem.controller");

router.get("/add", poem_controller.add);
router.post("/add", poem_controller.create);
router.get("/all", poem_controller.all);

module.exports = router;
