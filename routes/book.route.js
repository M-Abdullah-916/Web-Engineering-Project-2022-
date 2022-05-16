const express = require("express");
const router = express.Router();

const book_controller = require("../controllers/books.controller");

router.get("/add", book_controller.add);
router.post("/addm", book_controller.createManual);
router.post("/adda", book_controller.createAutomatic);
router.get("/all", book_controller.all);
router.get("/update", book_controller.update);

module.exports = router;
