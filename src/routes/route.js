const express = require('express');

const router = express.Router();

const userController = require("../controller/userController")
const bookController = require("../controller/bookController")
const reviewController = require("../controller/reviewController")

router.post("/register", userController.createUser)

router.post("/login",userController.userLogin )

router.post("/books",bookController.createBook)

router.get("/books",bookController.getBook)

router.get("/books/:bookId",bookController.bookById)

router.put("/books/:bookId",bookController.updateBook)

router.delete("/books/:bookId",bookController.deleteBookById)

router.post("/books/:bookId/review", reviewController.createReview )

router.put("/books/:bookId/review/:reviewId", reviewController.updateReview )

module.exports = router;
//adding this comment for nothing