import { BookSqlModel } from './../../../model/mysql/books.model';
import { Response, Request } from 'express';
import { StoreMySqlModel } from '../../../model/mysql/shop.model';
import { isValidId } from "./../../../util/util";
import { ValidateInsertShopBook } from '../validator/shop.validator';
class GenreController {
    constructor() {

    }

    public static getAllBooksFromShop = async (req: Request, res: Response) => {
        let response;
        try {
            const genre = await StoreMySqlModel.getAllBooksFromShop();
            response = {
                ResponseData: genre,
                ResponseMessage: 'All Shop Books Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static getShopBookById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const genre = await StoreMySqlModel.getShopBookById(id);
            response = {
                ResponseData: genre,
                ResponseMessage: 'Shop Book Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }


    public static insertBookIntoStore = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertShopBook(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const bookId = req.body.data.bookId
            const count = req.body.data.count
            const bookFetched = await BookSqlModel.getBookById(bookId)
            if (!bookFetched) {
                return res.send({ ResponseMessage: "Book Id Not Found" }).status(400).end();
            }
            const insertedID = await StoreMySqlModel.insertBookIntoStore(bookId, count)
            response = {
                ResponseData: insertedID,
                ResponseMessage: 'Book Inserted into shop',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }

    public static updateStoreBookById = async (req: Request, res: Response) => {
        let response;

        try {
            const { error } = ValidateInsertShopBook(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id;
            if (!isValidId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const bookId = req.body.data.bookId
            const count = req.body.data.count
            const bookFetched = await BookSqlModel.getBookById(bookId)
            if (!bookFetched) {
                return res.send({ ResponseMessage: "Book Id Not Found" }).status(400).end();
            }
            await StoreMySqlModel.updateAuthorById(id, bookId, count);
            response = {
                ResponseData: null,
                ResponseMessage: 'Store Updated'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }

    public static deleteShopBookById = async (req: Request, res: Response) => {
        let response;
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        try {
            await StoreMySqlModel.deleteShopBookById(id);
            response = {
                ResponseData: null,
                ResponseMessage: 'Shop Book Deleted'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }


}

const InsertBookIntoStore = GenreController.insertBookIntoStore
const GetAllBooksFromShop = GenreController.getAllBooksFromShop
const GetShopBookById = GenreController.getShopBookById
const UpdateStoreBookById = GenreController.updateStoreBookById
const DeleteShopBookById = GenreController.deleteShopBookById
export {
    InsertBookIntoStore,
    GetAllBooksFromShop,
    GetShopBookById,
    DeleteShopBookById,
    UpdateStoreBookById
}