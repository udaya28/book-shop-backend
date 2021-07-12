import { AuthorSqlModel } from './../../../model/mysql/authors.model';
import { Response, Request } from 'express';
import { isValidId } from './../../../util/util';
import { BookSqlModel } from './../../../model/mysql/books.model';
import { ValidateInsertBook } from '../validator/book.validator';
import { GenreListSqlModel } from './../../../model/mysql/genresList.model';
class BookController {
    constructor() {

    }

    public static getAllBook = async (req: Request, res: Response) => {
        let response;
        try {
            const author = await BookSqlModel.getAllBook();
            const genreList = await GenreListSqlModel.getAllGenreList()
            response = {
                ResponseData: author,
                ResponseMessage: 'All Book Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static getBookById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const author = await BookSqlModel.getBookById(id);
            response = {
                ResponseData: author,
                ResponseMessage: 'Book Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }


    public static insertBook = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertBook(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const title = req.body.data.title
            const price = req.body.data.price
            const authorName = req.body.data.authorName
            const genreIdArray: Array<number> = req.body.data.genreIdArray || []
            const author = await AuthorSqlModel.getAuthorByName(authorName)
            if (!author) {
                return res.send({ ResponseMessage: "Author Not Found" }).status(400).end();
            }

            const insertedID = await BookSqlModel.insertBook(title, price, author[0].id)

            const insertGenreListPromise = genreIdArray.map(genreId => {
                return GenreListSqlModel.insertGenreListWithBookId(insertedID, genreId)
            });
            try {
                const result = await Promise.all(insertGenreListPromise)
                response = {
                    ResponseData: insertedID,
                    ResponseMessage: 'Book Inserted',
                }
            } catch (error) {
                console.log(error);
                const PromiseArray = [BookSqlModel.deleteBookById(insertedID), GenreListSqlModel.deleteGenreListByBookId(insertedID)]
                await Promise.all(PromiseArray)
                return res.send({ ResponseMessage: "Error in inserting Genre List" }).status(500).end();
            }



        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }

    public static deleteBookById = async (req: Request, res: Response) => {
        let response;
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        try {
            await Promise.all([BookSqlModel.deleteBookById(id), GenreListSqlModel.deleteGenreListByBookId(id)])
            response = {
                ResponseData: null,
                ResponseMessage: 'Book Deleted'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }


}

const InsertBook = BookController.insertBook
const GetAllBook = BookController.getAllBook
const GetBookById = BookController.getBookById
const DeleteBookById = BookController.deleteBookById
export {
    InsertBook,
    GetAllBook,
    GetBookById,
    DeleteBookById
}