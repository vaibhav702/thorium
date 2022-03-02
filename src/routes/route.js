const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publishercontroller")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})//author is an object id

router.post("/createNewAuthor", authorController.createNewAuthor  )
// router.get("/ getAuthorsData", authorController.getAuthorsData  )

router.post("/createNewPublisher", publisherController.createNewPublisher  )
router.post("/createNewBook", bookController.createNewBook  )

router.get("/getBooksDataWithAuthorDetail", bookController.getBooksDataWithAuthorDetail)

// router.post("/createBook", bookController.createBook  )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;