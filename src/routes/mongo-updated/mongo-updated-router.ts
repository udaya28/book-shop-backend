import * as express from "express";
import authorController from "./controllers/author.controller";
import { validateMiddleware } from "./validator/middleware.validator";
import { authorSchema, bookSchema, updateAuthorSchema, updateBookSchema } from "./validator/schema.validator";
const { addBookByAuthorId, deleteAuthorById, deleteBookByBookIdAndAuthorId, getAllAuthor, getAllBookByAuthorId, getAuthorById, getBookByAuthorId, insertAuthor, updatedAuthorById, updateBookByAuthorIdAndAuthorId } = authorController

interface MongoUpdatedInterface {
    router: express.Router,
    configRoutes(): void
}
class MongoUpdated implements MongoUpdatedInterface {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    configRoutes() {
        console.log("MongoDb Updated routes")

        this.router.get('/author/:authorId/book', getAllBookByAuthorId)
        this.router.get('/author/:authorId/book/:bookTitle', getBookByAuthorId)
        this.router.put('/author/:authorId/book', validateMiddleware(bookSchema), addBookByAuthorId)
        this.router.patch('/author/:authorId/book/:bookTitle', validateMiddleware(updateBookSchema), updateBookByAuthorIdAndAuthorId)
        this.router.delete('/author/:authorId/book/:bookTitle', deleteBookByBookIdAndAuthorId)

        this.router.get('/author', getAllAuthor)
        this.router.get('/author/:authorId', getAuthorById)
        this.router.put('/author', validateMiddleware(authorSchema), insertAuthor)
        this.router.patch('/author/:authorId', validateMiddleware(updateAuthorSchema), updatedAuthorById)
        this.router.delete('/author/:authorId', deleteAuthorById)

    }
}

const MongoUpdatedRouter = new MongoUpdated().router;
export default MongoUpdatedRouter;
