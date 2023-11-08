const express = require("express");

const bookController = require("../controllers/book.controller");

const router = express.Router();

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.delete("/:id", bookController.deleteBook);
router.put("/:id", bookController.updateBook);

module.exports = router;
