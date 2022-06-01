const express = require("express");
const router = express.Router();

const poem_controller = require("../controllers/poem.controller");

router.get("/add", poem_controller.add);
router.post("/addm", poem_controller.createManual);
router.post("/adda", poem_controller.createAutomatic);
router.get("/all", poem_controller.all);
router.get("/updateParam/:id", poem_controller.updateParam);
router.post("/update/:id", poem_controller.updateBook);
router.get("/update", poem_controller.update);
router.get("/delete", poem_controller.delete);
router.get("/delete/:id", poem_controller.deleteBook);




module.exports = router;
