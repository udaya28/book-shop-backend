import { AuthorSqlModel } from './../../../model/mysql/authors.model';
import { Response, Request } from 'express';
import { isValidId } from './../../../util/util';
import { BookSqlModel } from './../../../model/mysql/books.model';
import { ValidateInsertBook } from '../validator/book.validator';
import { GenreListSqlModel } from './../../../model/mysql/genresList.model';
import { GenreSqlModel } from './../../../model/mysql/genres.model';
class BookController {
    constructor() {

    }

    public static getAllBook = async (req: Request, res: Response) => {
        let response;
        try {
            const books = await BookSqlModel.getAllBook();
            const genreList = await GenreListSqlModel.getAllGenreList()
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
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const book = await BookSqlModel.getBookById(id);
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
        let response;
        try {
            const { error } = ValidateInsertBook(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const title = req.body.data.title
            const price = req.body.data.price
            const authorId = req.body.data.authorId
            const genreIdArray: Array<number> = req.body.data.genreIdArray || []
            const author: any = await AuthorSqlModel.getAuthorById(authorId)
            if (!author) {
                return res.send({ ResponseMessage: "Author Not Found" }).status(400).end();
            }

            const validateGenreListPromise = genreIdArray.map(genreId => {
                return GenreSqlModel.getGenreById(genreId)
            });

            const genreResult = await Promise.all(validateGenreListPromise)
            const bool = genreResult.every((genre: any) => {
                return genre || genre?.ResponseData != null
            })
            if (!bool) {
                return res.send({ ResponseMessage: "Invalid Genre Id" }).status(500).end();
            }
            const insertedID = await BookSqlModel.insertBook(title, price, author[0].id)
            try {
                const insertGenreListPromise = genreIdArray.map(genreId => {
                    return GenreListSqlModel.insertGenreListWithBookId(insertedID, genreId)
                });
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
    public static updateBook = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertBook(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id
            if (!isValidId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const title = req.body.data.title
            const price = req.body.data.price
            const authorId = req.body.data.authorId
            const genreIdArray: Array<number> = req.body.data.genreIdArray || []
            const author: any = await AuthorSqlModel.getAuthorById(authorId)
            if (!author) {
                return res.send({ ResponseMessage: "Author ID Not Found" }).status(400).end();
            }
            const validateGenreListPromise = genreIdArray.map(genreId => {
                return GenreSqlModel.getGenreById(genreId)
            });
            const genreResult = await Promise.all(validateGenreListPromise)
            const bool = genreResult.every((genre: any) => {
                return genre || genre?.ResponseData != null
            })
            if (!bool) {
                return res.send({ ResponseMessage: "Invalid Genre Id" }).status(500).end();
            }
            await GenreListSqlModel.deleteGenreListByBookId(id)
            await BookSqlModel.updateBook(id, title, price, author[0].id)
            try {
                const insertGenreListPromise = genreIdArray.map(genreId => {
                    return GenreListSqlModel.insertGenreListWithBookId(id, genreId)
                });
                const result = await Promise.all(insertGenreListPromise)
                response = {
                    ResponseData: id,
                    ResponseMessage: 'Book Updated',
                }
            } catch (error) {
                console.log(error);
                return res.send({ ResponseMessage: "Error in Updating Genre List" }).status(500).end();
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
const UpdateBookById = BookController.updateBook
export {
    InsertBook,
    GetAllBook,
    GetBookById,
    DeleteBookById,
    UpdateBookById
}