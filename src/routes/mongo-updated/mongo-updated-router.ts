import * as express from "express";
import { AddBookByAuthorId, DeleteAuthorById, DeleteBookByBookIdAndAuthorId, GetAllAuthor, GetAllBookByAuthorId, GetAuthorById, GetBookByAuthorId, InsertAuthor, UpdatedAuthorById } from "./controllers/author.controller";


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
        this.router.post('/author/:authorId/book', AddBookByAuthorId)
        this.router.delete('/author/:authorId/book/:bookTitle',DeleteBookByBookIdAndAuthorId )

        this.router.get('/author', GetAllAuthor)
        this.router.get('/author/:authorId', GetAuthorById)
        this.router.post('/author', InsertAuthor)
        this.router.patch('/author/:authorId', UpdatedAuthorById)
        this.router.delete('/author/:authorId',DeleteAuthorById )

    }


}

const MongoUpdatedRouter = new MongoUpdated().router;
export default MongoUpdatedRouter;

// (async () => {
//     let test: AuthorNew;
//     test = {
//         authorCountry: "IND",
//         authorName: "udaya",
//         books: {
//             "Java": {
//                 title: "Java",
//                 publishedOn: "2020",
//                 genres: ["Java", "GUI"]
//             },
//             "HTML and CSS": {
//                 title: "HTML and CSS",
//                 publishedOn: "2021",
//                 genres: ["HTML", "CSS"]
//             }
//         }
//     }

//     const result = await AuthorDBNew.create(test);
//     console.log(result)

// })()