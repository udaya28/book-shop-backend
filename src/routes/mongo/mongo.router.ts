import * as express from "express"; 
import { bookController } from "./controller/book.controller.mongo";
import { shopController } from "./controller/shop.controller.mongo";
const { getAllBook, insertBook, getBookById, deleteBookById, updateBook } = bookController
const { getAllShopBook, deleteShopBookById, getShopBookById, insertShopBook, updateShopBookById } = shopController
class Mongo {
    public router: express.Router;
    constructor() {
        this.router = express.Router();
        this.configRoutes();
    }

    private configRoutes() {
        console.log("MongoDb routes")
        this.router.get('/book', getAllBook)
        this.router.get('/book/:id', getBookById)
        this.router.post('/book', insertBook)
        this.router.patch('/book/:id', updateBook)
        this.router.delete('/book/:id', deleteBookById)

        this.router.get('/shop', getAllShopBook)
        this.router.get('/shop/:id', getShopBookById)
        this.router.post('/shop', insertShopBook)
        this.router.patch('/shop/:id', updateShopBookById)
        this.router.delete('/shop/:id', deleteShopBookById)
    }


}

const MongoRouter = new Mongo().router;
export default MongoRouter;