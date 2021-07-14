import * as express from "express";
import authorController from "./controllers/author.controller";
const { addBookByAuthorId, deleteAuthorById, deleteBookByBookIdAndAuthorId, getAllAuthor, getAllBookByAuthorId, getAuthorById, getBookByAuthorId, insertAuthor, updatedAuthorById } = authorController
import { validateMiddleware } from "./validator/middleware.validator";
import { authorSchema, bookSchema } from "./validator/schema.validator";

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
        this.router.post('/author/:authorId/book', validateMiddleware(bookSchema), addBookByAuthorId)
        this.router.delete('/author/:authorId/book/:bookTitle', deleteBookByBookIdAndAuthorId)

        this.router.get('/author', getAllAuthor)
        this.router.get('/author/:authorId', getAuthorById)
        this.router.post('/author', validateMiddleware(authorSchema), insertAuthor)
        this.router.patch('/author/:authorId', validateMiddleware(authorSchema), updatedAuthorById)
        this.router.delete('/author/:authorId', deleteAuthorById)

    }
}

const MongoUpdatedRouter = new MongoUpdated().router;
export default MongoUpdatedRouter;
