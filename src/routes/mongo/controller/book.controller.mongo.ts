import { Response, Request } from 'express';
import { BookMongo } from './../../../interfaces/index';
import { ValidateInsertBookMongo } from '../validator/book.validator.mongo';
import { BookDB } from './../../../model/mongo/books.model.mongo';
import { isValidMongoId } from './../../../util/util';

class BookControllerMongo {
    constructor() { }


    public static getAllBook = async (req: Request, res: Response) => {
        let response: any;
        try {
            const books: Array<BookMongo> = await BookDB.find({});
            response = {
                ResponseData: books,
                ResponseMessage: 'All Book Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static getBookById = async (req: Request, res: Response) => {
        let response: any;

        try {
            const id = req.params.id;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const book: Array<BookMongo> = await BookDB.find({ _id: id });
            response = {
                ResponseData: book,
                ResponseMessage: 'Book Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static insertBook = async (req: Request, res: Response) => {
        try {
            const { error } = ValidateInsertBookMongo(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const title = req.body.data.title;
            const price = req.body.data.price;
            const authorName = req.body.data.authorName;
            const authorCountry = req.body.data.authorCountry;
            const genre = req.body.data.genre;
            let response: any;
            const user = await BookDB.create({
                title,
                price,
                authorName,
                authorCountry,
                genre
            });
            console.log(user)
            response = {
                ResponseData: user._id,
                ResponseMessage: 'Book Inserted',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static updateBook = async (req: Request, res: Response) => {
        try {
            const { error } = ValidateInsertBookMongo(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const book: any = await BookDB.findOne({ _id: id });
            if (!book || book.length == 0) {
                return res.send({ ResponseMessage: "Book Id not found" });
            }
            const title = req.body.data.title;
            const price = req.body.data.price;
            const authorName = req.body.data.authorName;
            const authorCountry = req.body.data.authorCountry;
            const genre = req.body.data.genre;
            let response: any;
            const user = await BookDB.updateOne({ _id: id }, {
                title,
                price,
                authorName,
                authorCountry,
                genre
            });
            console.log(user)
            response = {
                ResponseData: user,
                ResponseMessage: 'Book Updated',
            }
            return res.send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    }

    public static deleteBookById = async (req: Request, res: Response) => {
        let response: any;
        try {
            const id = req.params.id;
            if (!isValidMongoId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const book: any = await BookDB.deleteOne({ _id: id });
            response = {
                ResponseData: book,
                ResponseMessage: 'Book Deleted',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

}

const GetAllBookMongo = BookControllerMongo.getAllBook;
const GetBookByIdMongo = BookControllerMongo.getBookById;
const InsertBookMongo = BookControllerMongo.insertBook;
const UpdateBookMongo = BookControllerMongo.updateBook;
const DeleteBookByIdMongo = BookControllerMongo.deleteBookById

export {
    GetAllBookMongo,
    InsertBookMongo,
    GetBookByIdMongo,
    DeleteBookByIdMongo,
    UpdateBookMongo
}

