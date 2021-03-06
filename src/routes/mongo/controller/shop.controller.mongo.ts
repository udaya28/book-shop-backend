import { Response, Request } from 'express';
import { shopMongo } from './../../../interfaces/index';
import { ValidateInsertShopMongo } from '../validator/shop.validator.mongo';
import { ShopDB } from './../../../model/mongo/shop.model.mongo';
import { BookDB } from './../../../model/mongo/books.model.mongo';
import { isValidMongoId } from './../../../util/util';

class ShopControllerMongo {
    constructor() { }


    getAllShopBook = async (req: Request, res: Response) => {
        let response: any;
        try {
            const shops: Array<shopMongo> = await ShopDB.find({}).populate('book');
            response = {
                ResponseData: shops,
                ResponseMessage: 'All Shops Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    getShopBookById = async (req: Request, res: Response) => {
        let response: any;

        try {
            const id = req.params.id;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const shop: Array<shopMongo> = await ShopDB.find({ _id: id }).populate('book');
            response = {
                ResponseData: shop,
                ResponseMessage: 'Shop Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    insertShopBook = async (req: Request, res: Response) => {
        try {
            let response: any;
            const { error } = ValidateInsertShopMongo(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const count = req.body.data.count;
            const bookId = req.body.data.bookId;
            if (!isValidMongoId(bookId)) {
                return res.send("Invalid Id").status(200)
            }
            const book: any = await BookDB.findOne({ _id: bookId });
            if (!book || book.length == 0) {
                return res.send({ ResponseMessage: "Book Id not found" });
            }
            const shop = await ShopDB.create({
                count,
                book: bookId,
            });
            console.log(shop)
            response = {
                ResponseData: shop._id,
                ResponseMessage: 'Book Inserted',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    updateShopBookById = async (req: Request, res: Response) => {
        let response: any;
        try {
            const { error } = ValidateInsertShopMongo(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id;
            const count = req.body.data.count;
            const bookId = req.body.data.bookId;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            if (!isValidMongoId(bookId)) {
                return res.send("Invalid Id").status(200)
            }
            const result = await Promise.all([await ShopDB.findOne({ _id: id }), BookDB.findOne({ _id: bookId })])
            const shop: any = result[0]
            if (!shop || shop.length == 0) {
                return res.send({ ResponseMessage: "Shop Id not found" });
            }
            const book: any = result[1]
            if (!book || book.length == 0) {
                return res.send({ ResponseMessage: "Book Id not found" });
            }
            const updatedShop = await ShopDB.updateOne({ _id: id }, {
                count,
                book: bookId,
            });
            response = {
                ResponseData: updatedShop,
                ResponseMessage: 'Shop Updated',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    deleteShopBookById = async (req: Request, res: Response) => {
        let response: any;

        try {
            const id = req.params.id;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const book: any = await ShopDB.deleteOne({ _id: id });
            response = {
                ResponseData: book,
                ResponseMessage: 'Shop Deleted',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

}

const shopController = new ShopControllerMongo

export {
    shopController
}

