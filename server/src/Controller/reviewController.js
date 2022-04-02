//----------------------import--------------------------------------------------------//
const bookModel = require("../models/bookModel");
const reviewModel = require("../models/reviewModel");
const validator = require("../validator/validator");
//----------------------Add Review--------------------------------------------------------//
const addReview = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    //----------------------Validation Start--------------------------------------------------------//
    if (!(validator.isValid(bookId) && validator.isValidObjectId(bookId))) {
      return res.status(400).send({
        status: false,
        msg: "ERROR!: Bad request bookId is not present or bookId is not valid",
      });
    }

    if (!validator.isValidRequestBody(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "Review body is empty" });
    }

    let { reviewedBy, rating, review } = req.body;

    if (!validator.isValid(reviewedBy)) {
      req.body.reviewedBy = "Guest";
    }

    if (!validator.isValid(rating)) {
      return res
        .status(400)
        .send({
          status: false,
          message: "Bad request rating is empty or not present",
        });
    }

    if (!/^[1-5]{1}/.test(rating)) {
      return res.status(400).send({
        status: false,
        message: `ERROR!: ${rating} is not valid rating insert value between 1 to 5`,
      });
    }
    //----------------------Validation Ends--------------------------------------------------------//
    let bookData = await bookModel.findOne({ _id: bookId, isDeleted: false });

    if (!bookData) {
      return res.status(404).send({
        status: false,
        message: `book with this ID: ${bookId} is not found or deleted`,
      });
    }

    const isBookPresent = await bookModel.findOneAndUpdate(
      { _id: bookId, isDeleted: false },
      { $inc: { reviews: 1 } }
    );

    if (!isBookPresent) {
      return res
        .status(404)
        .send({
          status: false,
          message: `book with this ID: ${bookId} is not found`,
        });
    }

    req.body.reviewedAt = new Date();
    req.body.bookId = bookId;

    const newReview = await reviewModel.create(req.body);

    return res.status(201).send({
      status: true,
      message: "Thank you for reviewing",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//----------------------Update review--------------------------------------------------------//
const updateReviews = async (req, res) => {
  try {
    let bookId = req.params.bookId;
    // if (!bookId) bookId = req.query.bookId;
    // if (!bookId) bookId = req.body.bookId;
    let reviewId = req.params.reviewId;
    // if (!reviewId) reviewId = req.query.reviewId;
    // if (!reviewId) reviewId = req.body.reviewId;

    //----------------------Validation Start--------------------------------------------------------//

    if (!validator.isValid(req.params)) {
      return res
        .status(400)
        .send({ status: false, message: "there no Data Input in request" });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        status: false,
        message: "Bad request there is no input data for updation",
      });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res.status(400).send({ status: false, message: "Invalid bookId" });
    }

    if (!validator.isValid(reviewId)) {
      return res.status(400).send({
        status: false,
        msg: "bookId is must please provide reviewId ",
      });
    }

    if (!validator.isValidObjectId(reviewId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid reviewId" });
    }
    //----------------------Validation Ends--------------------------------------------------------//

    let bookExists = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    if (!bookExists) {
      return res.status(404).send({
        status: false,
        message: `book with this ID: ${bookId} is not found please enter valid bookId `,
      });
    }

    if (reviewId) {
      let reviewExists = await reviewModel.findOne({
        _id: reviewId,
        bookId: bookId,
        isDeleted: false,
      });

      if (!reviewExists) {
        return res.status(404).send({
          status: false,
          message: `review with this reviewId : ${reviewId} is not found please enter valid reviewId`,
        });
      }
    }

    req.body.reviewedAt = new Date(); //.toLocaleString();

    const newUpdattion = req.body;

    await reviewModel.updateOne(
      { _id: reviewId, bookId: bookId, isDeleted: false },
      newUpdattion
    );

    const bookReviews = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });

    const booksTotalReviews = await reviewModel
      .find({ bookId: bookId, isDeleted: false })
      .select({
        _id: 1,
        bookId: 1,
        reviewedBy: 1,
        reviewedAt: 1,
        rating: 1,
        review: 1,
      });

    const newObject = {
      bookReviews,
      reviewData: booksTotalReviews,
    };

    return res
      .status(200)
      .send({ status: true, message: "Success", Data: newObject });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//----------------------- --------deletedReview-------------------------------------------------//

const deletedReview = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    let reviewId = req.params.reviewId;
    //----------------------Validation Start--------------------------------------------------------//

    if (!(validator.isValid(bookId) && validator.isValidObjectId(bookId))) {
      return res.status(400).send({
        status: false,
        message: "bookId is not present or Invalid bookId",
      });
    }

    if (!(validator.isValid(reviewId) && validator.isValidObjectId(reviewId))) {
      return res.status(400).send({
        status: false,
        message: "reviewId is not present or Invalid reviewId",
      });
    }
    //----------------------Validation Ends--------------------------------------------------------//

    let isReviewIdPresent = await reviewModel.findOne({
      _id: reviewId,
      isDeleted: false,
    });

    if (isReviewIdPresent == null) {
      return res.status(404).send({
        status: true,
        msg: "No review is present",
      });
    }

    const isBookIdPresent = await bookModel.findOneAndUpdate(
      {
        _id: bookId,
        isDeleted: false,
      },
      {
        $inc: {
          reviews: -1,
        },
      }
    );

    if (isBookIdPresent == null) {
      return res.status(404).send({
        status: false,
        msg: "No book is found",
      });
    }

    const date = new Date();

    await reviewModel.findByIdAndUpdate(
      reviewId,
      {
        isDeleted: true,
        deletedAt: date,
      },
      {
        new: true,
      }
    );

    return res.status(200).send({
      status: true,
      message: "Success",
    });
  } catch (err) {
    return res.status(500).send({
      msg: err.message,
    });
  }
};
//----------------------Exporting Module--------------------------------------------------------//

module.exports.updateReviews = updateReviews;
module.exports.addReview = addReview;
module.exports.deletedReview = deletedReview;
