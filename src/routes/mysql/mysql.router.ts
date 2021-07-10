import * as express from "express";
import { InsertAuthor, GetAllAuthor, GetAuthorById, DeleteAuthorById, UpdateAuthorById } from "./controller/author.controller";
import { DeleteGenreById, GetAllGenre, GetGenreById, InsertGenre, UpdateGenreById } from "./controller/genre.controller";
import { GetAllBook, GetBookById, InsertBook, DeleteBookById } from "./controller/book.controller";
import { DeleteGenreListByBookId, GetAllGenreList, GetGenreListByBookId, InsertGenreListWithBookId } from "./controller/genreList.controller";
import { DeleteShopBookById, GetAllBooksFromShop, GetShopBookById, InsertBookIntoStore, UpdateStoreBookById } from "./controller/shop.controller";

const validator = require('express-joi-validation').createValidator({})
class MySql {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        console.log("routes")

        this.router.get('/author', GetAllAuthor)
        this.router.get('/author/:id', GetAuthorById)
        this.router.post('/author', InsertAuthor)
        this.router.patch('/author/:id', UpdateAuthorById)
        this.router.delete('/author/:id', DeleteAuthorById)

        this.router.get('/genre', GetAllGenre)
        this.router.get('/genre/:id', GetGenreById)
        this.router.post('/genre', InsertGenre)
        this.router.patch('/genre/:id', UpdateGenreById)
        this.router.delete('/genre/:id', DeleteGenreById)

        this.router.get('/genre-list', GetAllGenreList)
        this.router.get('/genre-list/:id', GetGenreListByBookId)
        this.router.post('/genre-list', InsertGenreListWithBookId)
        this.router.delete('/genre-list/:id', DeleteGenreListByBookId)

        this.router.get('/book', GetAllBook)
        this.router.get('/book/:id', GetBookById)
        this.router.post('/book', InsertBook)
        this.router.delete('/book/:id', DeleteBookById)

        this.router.get('/shop', GetAllBooksFromShop)
        this.router.get('/shop/:id', GetShopBookById)
        this.router.post('/shop', InsertBookIntoStore)
        this.router.patch('/shop/:id', UpdateStoreBookById)
        this.router.delete('/shop/:id', DeleteShopBookById)
    }
}

const MySqlRouter = new MySql().router;
export default MySqlRouter;