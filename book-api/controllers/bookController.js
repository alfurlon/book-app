const Book = require('./../models/bookModel');
const Author = require('./../models/authorModel');
const User = require('./../models/userModel');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');

exports.getAllBooks = catchAsync(async (req, res, next) => {
    const books = await Book.find({});
    const authors = await Author.find({});

    // replace book.author (which is just the authorId) with the author object
    books.forEach((book) => {
        const author = authors.find((author) => author.id.toString() === book.author.toString());
        book.author = author;
    })

    res.status(200).json({
        status: 'success',
        result: {
            books
        }
    })
})

exports.getBookById = catchAsync(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return next(new AppError('No book found', 404));
    } else {

        // Get Author for book
        const author = await Author.findById(book.author);

        // This should never happen as creating a book
        // requires an author and there is no way to
        // delete an author.
        if (!author) {
            res.status(200).json({
                status: 'success',
                result: {
                    book,
                    message: "No Author found"
                }
            })
        }

        // Change the author value in the book object
        // to the actual author object
        book.author = author;
        res.status(200).json({
            status: 'success',
            result: {
                book,
                message: ""
            }
        })

    }
})

exports.getBookBySlug = catchAsync(async (req, res, next) => {
    const book = await Book.findOne({ slug: req.params.slug })


    if (!book) {
        return next(new AppError('No book found', 404));
    } else {

        // Get Author for book
        const author = await Author.findById(book.author);

        // This should never happen as creating a book
        // requires an author and there is no way to
        // delete an author.
        if (!author) {
            res.status(200).json({
                status: 'success',
                result: {
                    book,
                    message: "No Author found"
                }
            })
        }

        // Change the author value in the book object
        // to the actual author object
        book.author = author;
        res.status(200).json({
            status: 'success',
            result: {
                book,
                message: ""
            }
        })

    }
})

exports.getBooksByUserId = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found', 404));
    }

    // Populate bookList with full books
    let filledBookList = []
    for (const id of user.bookList) {
        const book = await Book.findById(id)
        const author = await Author.findById(book.author._id)
        book.author = author
        filledBookList.push(book)
    }

    if (!filledBookList.length) {
        return next(new AppError('No books in list', 404));
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                filledBookList
            }
        });
    }
})

exports.createBook = catchAsync(async (req, res, next) => {

    // Get user.
    // If user doesn't exist return an error and do not save book
    const existingUser = await User.findById(req.headers.id)

    if (!existingUser) {
        return next(new AppError('No user to save book to.', 400))
    }

    const author = {
        firstName: req.body.authorFirstName,
        lastName: req.body.authorLastName
        };

    // Checking if the author exists
    // If they do, assign existing authors id to authorId variable
    // if they don't save information
    const existingAuthor = await Author.findOne({
        firstName: { $regex: new RegExp(`^${author.firstName}$`, 'i') },
        lastName: { $regex: new RegExp(`^${author.lastName}$`, 'i') }});
    let authorId;
    let newAuthor;
    if (existingAuthor) {
        authorId = existingAuthor._id;
    } else {
        newAuthor = new Author({
            firstName: author.firstName,
            lastName: author.lastName
        });

        await newAuthor.save();
        authorId = newAuthor._id;
    }

    req.body = sanitizeData(req.body)
    
    // Create and save new book
    const book = new Book({
        title: req.body.title,
        author: authorId,
        summary: req.body.summary,
        coverPhoto: req.file?.path,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre,
        pages: req.body.pages
    });

    // !! Need to review this. It will save even with an error
    // !! had an error just below this but it already saved the book
    const newBook = await book.save();

    // Add book to user creating the book
    // The user signed in should be at req.user
    // !! Turning off for right now. Need a way to better handle the error if there is no bookList
    existingUser.bookList.push(newBook._id)
    // console.log('booklist afer push', existingUser)

    // update the user
    const updatedUser = await User.findByIdAndUpdate(existingUser._id, existingUser)
    // console.log('updatedUser', updatedUser)
    const newBookList = updatedUser.bookList
    // console.log('new book list', newBookList)


    // Send response with newly created book and author
    res.status(201).json({
        status: 'success',
        result: {
            newBook,
            newAuthor,
            newBookList
        }
    })
})

exports.updateBook = async (req, res, next) => {

    req.body = sanitizeData(req.body)

    // Update the book
    const book = new Book({
        title: req.body.title,
        summary: req.body.summary,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre,
        pages: req.body.pages
    });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    if (!updatedBook) {
        return next(new AppError('No book found', 404));
    } else {
        res.status(200).json({
            status: 'success',
            result: {
                updatedBook
            }
        })
    }
}

exports.deleteBook = async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return next(new AppError('No book found', 404));
    } else {
        res.status(204).json({
            status: 'success',
            data: null
          });
    }
}

/*
    data: The req.body object
*/
function sanitizeData(data) {
    const acceptableGenres = ['fantasy', 'science fiction', 'dystopian',
    'adventure', 'romance', 'mystery', 'horror', 'thriller', 'lgbtq', 'historical fiction',
    'young adult', 'childrens fiction', 'memoir', 'autobiography', 'biography', 'cooking',
    'art', 'photography', 'self-help', 'health', 'history', 'hobby', 'relationships', 'humor',
    'business', 'law', 'politics', 'philosophy', 'religion', 'education', 'travel', 'true crime']

    // genre: Check for acceptable genres
    if (data.genre) {
        data.genre = acceptableGenres.includes(data.genre.toLowerCase()) ? data.genre : ''
    }

    // publishedDate: Check date
    if (data.publishedDate) {
        console.log(data.publishedDate)
    }

    return data
}

// !! Create some custom aggregate routes