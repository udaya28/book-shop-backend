import * as express from "express";
import { GetAllBookMongo, InsertBookMongo, GetBookByIdMongo, DeleteBookByIdMongo } from "./controller/book.controller.mongo";
import { GetAllShopBookMongo, DeleteShopBookByIdMongo, GetShopBookByIdMongo, InsertShopBookMongo } from "./controller/shop.controller.mongo";

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

        this.router.get('/shop', GetAllShopBookMongo)
        this.router.get('/shop/:id', GetShopBookByIdMongo)
        this.router.post('/shop', InsertShopBookMongo)
        // this.router.patch('/shop/:id', UpdateStoreBookById)
        this.router.delete('/shop/:id', DeleteShopBookByIdMongo)
    }


}

const MongoRouter = new Mongo().router;
export default MongoRouter;