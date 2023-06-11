const Book = require('./../models/bookModel');
const Author = require('./../models/authorModel');


exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        const authors = await Author.find({});

        // replace book.author with the author
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

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        })
    }
}

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);


        if (!book) {
            res.status(404).json({
                status: 'failed',
                message: 'Book not found'
            })
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

    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message
        })
    }
}

exports.createBook = async (req, res, next) => {
    try {

        // I don't know if this will work with real forms
        // This works with insomnia multipart forms
        const author = {
            firstName: req.body['author.firstName'],
            lastName: req.body['author.lastName']
          };
        // !! Still need to test unhappy path
        // !! Maybe practice with Mocha
        //!! Need to handle the case of photos being larger than 100MB

        // Checking if the author exists
        // If they do, do nothing
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

        // Create and save new book
        const book = new Book({
            title: req.body.title,
            author: authorId,
            summary: req.body.summary,
            coverPhoto: req.file.path,
            publishedDate: req.body.publishedDate,
            genre: req.body.genre,
            pages: req.body.pages,
            haveRead: req.body.haveRead,
            yearRead: req.body.yearRead
        });

        const newBook = await book.save();

        // Send response with newly created book and author
        res.status(201).json({
            status: 'success',
            result: {
                newBook,
                newAuthor
            }
        })

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            errorMessage: err.message
        })
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        // Check if the photo is being updated
        // If so get the url for it
        // const photo = req.files.photo;
        // let result;
        // if (photo) {
        //     result = await cloudinary.uploader.upload(file.tempFilePath);
        // }
        // Skip this for now

        // Check if updating the author
        // Skip this for now

        // Update the book
        const book = new Book({
            title: req.body.title,
            // author: authorId,
            summary: req.body.summary,
            //coverPhoto: result.secure_url,
            publishedDate: req.body.publishedDate,
            genre: req.body.genre,
            pages: req.body.pages,
            haveRead: req.body.haveRead,
            yearRead: req.body.yearRead
        });

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!updatedBook) {
            res.status(404).json({
                status: 'Failed',
                message: 'Could not find book'
            })
        } else {
            res.status(200).json({
                status: 'success',
                result: {
                    updatedBook
                }
            })
        }

    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            error: err.message
        })
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            res.status(404).json({
                statu: 'Failed',
                message: 'Could not find book'
            })
        } else {
            res.status(204).json({
                status: 'success',
                data: null
              });
        }
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            error: err.message || err
        })
    }
}

// !! Create some custom aggregate routes