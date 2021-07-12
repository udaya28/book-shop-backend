import { Genre } from "./../../../interfaces/genres.interface";
import { Response, Request } from 'express';
import { GenreSqlModel } from './../../../model/mysql/genres.model';
import { ValidateInsertGenre } from '../validator/genre.validator';
import { isValidId } from "./../../../util/util";
class GenreController {
    constructor() {

    }

    public static getAllGenre = async (req: Request, res: Response) => {
        let response;
        try {
            const genre = await GenreSqlModel.getAllGenre();
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

    public static getGenreById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const genre = await GenreSqlModel.getGenreById(id);
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


    public static insertGenre = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertGenre(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const name = req.body.data.genre
            const insertedID = await GenreSqlModel.insertGenre(name)
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

    public static updateGenreById = async (req: Request, res: Response) => {
        let response;

        try {
            const { error } = ValidateInsertGenre(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id;
            const genre = req.body.data.genre;
            if (!isValidId(id)) {
                return res.send("Invalid Id").status(200)
            }
            const genreFetched = await GenreSqlModel.getGenreById(id)
            if (!genreFetched) {
                return res.send({ ResponseMessage: "Genre Id Not Found" }).status(400).end();
            }

            await GenreSqlModel.updateGenreById(id, genre);
            response = {
                ResponseData: null,
                ResponseMessage: 'Genre Updated'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }

    public static deleteGenreById = async (req: Request, res: Response) => {
        let response;
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        try {
            await GenreSqlModel.deleteGenreById(id);
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

const InsertGenre = GenreController.insertGenre
const GetAllGenre = GenreController.getAllGenre
const GetGenreById = GenreController.getGenreById
const UpdateGenreById = GenreController.updateGenreById
const DeleteGenreById = GenreController.deleteGenreById
export {
    InsertGenre,
    GetAllGenre,
    GetGenreById,
    DeleteGenreById,
    UpdateGenreById
}