const express = require("express");
const router = express.Router();

const book_controller = require("../controllers/books.controller");

router.get("/add", book_controller.add);
router.post("/add", book_controller.create);

module.exports = router;
