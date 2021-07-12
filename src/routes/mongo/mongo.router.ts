import * as express from "express";
import { GetAllBookMongo, InsertBookMongo, GetBookByIdMongo, DeleteBookByIdMongo } from "./controller/book.controller.mongo";

class Mongo {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        console.log("MongoDb routes")
        this.router.get('/book', GetAllBookMongo)
        this.router.get('/book/:id', GetBookByIdMongo)
        this.router.post('/book', InsertBookMongo)
        this.router.delete('/book/:id', DeleteBookByIdMongo)

        // this.router.get('/shop', GetAllBooksFromShop)
        // this.router.get('/shop/:id', GetShopBookById)
        // this.router.post('/shop', InsertBookIntoStore)
        // this.router.patch('/shop/:id', UpdateStoreBookById)
        // this.router.delete('/shop/:id', DeleteShopBookById)
    }


}

const MongoRouter = new Mongo().router;
export default MongoRouter;