import * as express from "express";
import { AddBookByAuthorId, DeleteAuthorById, DeleteBookByBookIdAndAuthorId, GetAllAuthor, GetAllBookByAuthorId, GetAuthorById, GetBookByAuthorId, InsertAuthor, UpdatedAuthorById } from "./controllers/author.controller";
import { validateMiddleware } from "./validator/middleware.validator";
import { authorSchema, bookSchema } from "./validator/schema.validator";


class MongoUpdated {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        console.log("MongoDb Updated routes")

        this.router.get('/author/:authorId/book', GetAllBookByAuthorId)
        this.router.get('/author/:authorId/book/:bookTitle',GetBookByAuthorId )
        this.router.post('/author/:authorId/book',validateMiddleware(bookSchema), AddBookByAuthorId)
        this.router.delete('/author/:authorId/book/:bookTitle',DeleteBookByBookIdAndAuthorId )

        this.router.get('/author', GetAllAuthor)
        this.router.get('/author/:authorId', GetAuthorById)
        this.router.post('/author',validateMiddleware(authorSchema), InsertAuthor)
        this.router.patch('/author/:authorId',validateMiddleware(authorSchema), UpdatedAuthorById)
        this.router.delete('/author/:authorId',DeleteAuthorById )

    }
}

const MongoUpdatedRouter = new MongoUpdated().router;
export default MongoUpdatedRouter;
