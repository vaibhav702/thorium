const bookModel = require("../models/bookModel");
const validator = require("../validator/validator");
const reviewModel = require("../models/reviewModel");
const moment = require("moment");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

//-------------------------------------------------------------------------------------//
//when book isDeleted we delete all reviews is deleted
//Date proper validation
//ISBN
//title is unique or not RRR || Rrr || rrr ||
//userModel handal mr.MR.mss
//realeseAt Date date will be decreased by one day in responce
//check reviews are deleted
//Create Book
// there is need excerpt = unique if yes then change into model, check if it is present or not at creation and updation time
//check subarray is working or not
//bookID validations in middleware

const createBook = async function (req, res) {
  try {
    let data = req.body;

    if (!Object.keys(data).length) {
      return res
        .status(400)
        .send({ status: false, message: "Bad request input field is empty" });
    }

    const { title, excerpt, userId, ISBN, category, subcategory, reviews } =
      data;
    let { releasedAt } = data;
    //validation Starts

    if (!validator.isValid(title.trim())) {
      return res
        .status(400)
        .send({ status: false, message: "not a valid title" });
    }

    let isTitle = /^[A-Z]{1}[A-Za-z0-9-_ ]*$/;

    if (!isTitle.test(title.trim())) {
      return res.status(422).send({
        status: false,
        message: "please enter the first letter in upper case  ",
      });
    }

    // db.collection.find({'name': {'$regex': thename,$options:'i'}});
    const isTitleExists = await bookModel.find({
      title: { $regex: title, $options: "i" },
    });
    console.log(isTitleExists);
    const exactTitleMatch = [];
    for (let i = 0; i < isTitleExists.length; i++) {
      const str1 = isTitleExists[i].title;
      const str2 = title;
      if (str1.toLowerCase() === str2.toLowerCase()) {
        exactTitleMatch.push(str1);
      }
    }

    console.log(exactTitleMatch);
    if (exactTitleMatch.length) {
      return res
        .status(409)
        .send({
          status: false,
          message: `Bad Request this title: "${title}" is already exists with "${exactTitleMatch[0]}" this name`,
        });
    }

    if (!validator.isValid(excerpt)) {
      return res
        .status(400)
        .send({ status: false, message: "not a valid excerpt" });
    }

    if (!validator.isValidObjectId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "not a valid UserId" });
    }

    if (!validator.isValid(ISBN)) {
      return res
        .status(400)
        .send({ status: false, message: "Bad request ISBN is not present" });
    }

    // 12 3456 3456 54
    // 12-3456-3456-54
    if (!/^[0-9]{1}[0-9]{12}$/.test(ISBN)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `this ${ISBN} ISBN is not valid please enter 13 digit number`,
        });
    }

    if (ISBN) {
      let isbnExists = await bookModel.findOne({
        ISBN: ISBN,
        isDeleted: false,
      });

      if (isbnExists) {
        return res.status(409).send({
          status: false,
          message: `this ${ISBN} ISBN Number is already Exists please enter anotherone`,
        });
      }
    }

    if (!(validator.isValid(subcategory) && subcategory.length)) {
      return res
        .status(400)
        .send({ status: false, message: "not a valid subcategory" });
    }

    // if (!validator.isValid(reviews)) {
    //   return res
    //     .status(400)
    //     .send({ status: false, message: "not a valid reviews" });
    // }

    if (!validator.isValid(category)) {
      return res
        .status(400)
        .send({ status: false, message: "not a valid category" });
    }

    if (!validator.isValid(releasedAt)) {
      return res
        .status(400)
        .send({ status: false, message: "releasedAt is not present" });
    }
    //to get date at release at
    let m = moment(releasedAt, "YYYY-MM-DD");
    //m.isValid(); // false
    if (!m.isValid()) {
      return res
        .status(400)
        .send({
          status: false,
          message: `${releasedAt} is not valid date follow format: 'YYYY-MM-DD' `,
        });
    }
    //problem = date = 2011/12/22 convet 2011/12/21
    //solution
    const B = moment(releasedAt, "YYYY-MM-DD").add(1, "days");
    console.log(B);

    const savedData = await bookModel.create(data);
    return res.status(201).send({
      status: false,
      messsage: "books created successfully",
      data: savedData,
    });
  } catch (error) {
    return res.status(500).send({ status: true, Error: error.message });
  }
};

//-----------------------------------------------------------------------------------------//
// to get books
const getBook = async function (req, res) {
  try {
    const data = req.query;

    // const fgfg=Object.keys(data)
    // console.log(fgfg)

    if (!Object.keys(data).length) {
      let books = await bookModel.find({ isDeleted: false }); //.sort({title:-1});

      if (!books.length) {
        return res.status(404).send({ status: false, msg: "data not found" });
      }

      books.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      }); //use for ascending order sort

      return res
        .status(200)
        .send({ status: true, message: "get all books", data: books });
    } else {
      const { userId, category, subcategory } = data;
      if (!userId && !category && !subcategory) {
        return res
          .status(400)
          .send({ status: false, msg: "please  enter the valid input" });
      }
      let filter = await bookModel.find({
        $and: [
          { isDeleted: false },
          {
            $or: [
              { userId: userId },
              { category: category },
              { subcategory: subcategory },
            ],
          },
        ],
      }); //.sort({title:-1});
      console.log(subcategory);

      if (!filter.length) {
        return res
          .status(404)
          .send({ status: false, msg: "related data not found " });
      }

      filter.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
      return res
        .status(200)
        .send({ status: true, message: "get all books", data: filter });
    }
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//----------------------------------------------------------------------------------//
//to get book by id by using filter

const getBookById = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    if (!validator.isValid(req.params)) {
      return res
        .status(400)
        .send({ status: false, message: "there no Data Input in request" });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid ObjectId" });
    }

    const bookData = await bookModel.findOne({ _id: bookId, isDeleted: false });

    if (!validator.isValid(bookData)) {
      return res.status(404).send({
        status: false,
        message: `Book is not found with this ID: ${bookId}`,
      });
    }
    //to get book in review folder

    const reviews = await reviewModel
      .find({ bookId: bookId, isDeleted: false })
      .select({
        _id: 1,
        bookId: 1,
        reviewedBy: 1,
        reviewedAt: 1,
        rating: 1,
        review: 1,
      });
    //       console.log(reviews)
    //  console.log(bookData)
    //     bookData.reviewsData = reviews;
    const bookReviews = {
      bookData,
      reviewsData: reviews,
    };

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: bookReviews });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

const updateBook = async function (req, res) {
  try {
    if (!validator.isValid(req.params)) {
      return res
        .status(400)
        .send({ status: false, message: "there no Data Input in request" });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).send({
        status: false,
        message: "Bad Request there is no data in input field",
      });
    }

    let bookId = req.params.bookId;
    if (!bookId) bookId = req.query.bookId;
    if (!bookId) bookId = req.body.bookId;

    if (!bookId) {
      return res.status(400).send({
        status: false,
        msg: "bookId is must please provide bookId ",
      });
    }

    if (!validator.isValidObjectId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid ObjectId" });
    }

    const { title, ISBN, releasedAt } = req.body;

    if (title) {
      const isTitleExists = await bookModel.find({
        title: { $regex: title, $options: "i" },
        isDeleted: false,
      });
      console.log(isTitleExists);
      const exactTitleMatch = [];
      for (let i = 0; i < isTitleExists.length; i++) {
        const str1 = isTitleExists[i].title;
        const str2 = title;
        if (str1.toLowerCase() === str2.toLowerCase()) {
          exactTitleMatch.push(str1);
        }
      }

      console.log(exactTitleMatch);
      if (exactTitleMatch.length) {
        return res
          .status(409)
          .send({
            status: false,
            message: `Bad Request this title: "${title}" is already exists with "${exactTitleMatch[0]}" this name`,
          });
      }
    }

    if (!/^[0-9]{1}[0-9]{12}$/.test(ISBN)) {
      return res
        .status(400)
        .send({
          status: false,
          message: `this ${ISBN} ISBN is not valid please enter 13 digit number`,
        });
    }

    if (ISBN) {
      let isbnExists = await bookModel.findOne({
        ISBN: ISBN,
        isDeleted: false,
      });

      if (isbnExists) {
        return res.status(409).send({
          status: false,
          message: `this ${ISBN} Number is already Exists please enter anotherone`,
        });
      }
    }

    if (releasedAt) {
      if (!validator.isValid(releasedAt)) {
        return res
          .status(400)
          .send({ status: false, message: "releasedAt is not present" });
      }
      //to get date at release at
      let m = moment(releasedAt, "YYYY-MM-DD");
      //m.isValid(); // false
      if (!m.isValid()) {
        return res
          .status(400)
          .send({
            status: false,
            message: `${releasedAt} is not valid date follow format: 'YYYY-MM-DD' `,
          });
      }
    }

    let updateData = req.body;
    const dataupdate = await bookModel.updateOne(
      { _id: bookId, isDeleted: false },
      updateData,
      { new: true }
    );
    console.log(dataupdate);
    let newUpdate = await bookModel.find({ _id: bookId, isDeleted: false });

    if (!newUpdate.length) {
      return res.status(200).send({
        status: false,
        message: "updation failed : sorry match not found ",
      });
    }

    return res.status(200).send({
      status: true,
      message: "updated successfully",
      data: newUpdate,
    });
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

//------------------------------------------------------------------------------------//
//to delete book by its id
const deleteById = async function (req, res) {
  try {
    if (
      !validator.isValid(req.params.bookId) &&
      validator.isValidObjectId(req.params.bookId)
    ) {
      return res
        .status(400)
        .send({ status: false, message: "bookid is not valid or not present" });
    }

    let filter = {
      isdeleted: false,

      _id: req.params.bookId,
    };

    let deletedBook = await bookModel.findOneAndUpdate(
      filter,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!validator.isValid(deletedBook)) {
      return res.status(404).send({ status: false, message: "book not found" });
    }

    await reviewModel.findAndUpdate(
      { bookId: bookId },
      { isDeleted: true },
      { new: true }
    );

    if (deletedBook) {
      return res
        .status(200)
        .send({ status: true, msg: "book is successfully deleted" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, Error: error.message });
  }
};

module.exports.createBook = createBook;
module.exports.deleteById = deleteById;
module.exports.updateBook = updateBook;
module.exports.getBookById = getBookById;
module.exports.getBook = getBook;
