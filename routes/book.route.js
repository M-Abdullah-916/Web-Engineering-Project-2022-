const express = require("express");
const router = express.Router();

const book_controller = require("../controllers/books.controller");

router.get("/add", book_controller.add);
router.post("/addm", book_controller.createManual);
router.post("/adda", book_controller.createAutomatic);
router.get("/all", book_controller.all);
router.get("/updateParam/:id", book_controller.updateParam);
router.post("/update/:id", book_controller.updateBook);
router.get("/update", book_controller.update);
router.get("/delete", book_controller.delete);
router.get("/delete/:id", book_controller.deleteBook);
router.get('/pdfview', book_controller.showReport);
router.get("/generatepdf", book_controller.allReport);



module.exports = router;
