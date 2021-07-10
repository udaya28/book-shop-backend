import { Response, Request } from 'express';
import { GenreListSqlModel } from './../../../model/mysql/genresList.model';
import { ValidateInsertGenreList } from './../../../validator/genreList.validator';
import { isValidId } from "./../../../util/util";
import { GenreSqlModel } from './../../../model/mysql/genres.model';
import { BookSqlModel } from './../../../model/mysql/books.model';
class GenreListController {
    constructor() {

    }

    public static getAllGenreList = async (req: Request, res: Response) => {
        let response;
        try {
            const genre = await GenreListSqlModel.getAllGenreList();
            response = {
                ResponseData: genre,
                ResponseMessage: 'All Genre Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static getGenreByBookId = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const genre = await GenreListSqlModel.getGenreListByBookId(id);
            response = {
                ResponseData: genre,
                ResponseMessage: 'Genre Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }


    public static insertGenreListWithBookId = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertGenreList(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const bookId = req.body.data.bookId
            const genreId = req.body.data.genreId
            const genre = GenreSqlModel.getGenreById(genreId)
            const book = BookSqlModel.getBookById(bookId)
            const result = await Promise.all([genre, book])
            console.log(result)
            if (!result[0]) {
                return res.send({ ResponseMessage: "Genre Id Not Found" }).status(400).end();
            }
            if (!result[1]) {
                return res.send({ ResponseMessage: "Book Id Not Found" }).status(400).end();
            }
            const insertedID = await GenreListSqlModel.insertGenreListWithBookId(bookId, genreId)
            response = {
                ResponseData: insertedID,
                ResponseMessage: 'Genre Inserted',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }


    public static deleteGenreListByBookId = async (req: Request, res: Response) => {
        let response;
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        try {
            await GenreListSqlModel.deleteGenreListByBookId(id);
            response = {
                ResponseData: null,
                ResponseMessage: 'Genre Deleted'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }


}

const InsertGenreListWithBookId = GenreListController.insertGenreListWithBookId
const GetAllGenreList = GenreListController.getAllGenreList
const GetGenreListByBookId = GenreListController.getGenreByBookId
const DeleteGenreListByBookId = GenreListController.deleteGenreListByBookId
export {
    InsertGenreListWithBookId,
    GetAllGenreList,
    GetGenreListByBookId,
    DeleteGenreListByBookId,
}