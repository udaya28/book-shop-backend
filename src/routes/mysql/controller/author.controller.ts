import { Response, Request } from 'express';
import { isValidId } from './../../../util/util';
import { AuthorSqlModel } from './../../../model/mysql/authors.model';
import { ValidateInsertAuthor } from '../validator/author.validator';
class AuthorController {
    constructor() {

    }

    public static getAllAuthor = async (req: Request, res: Response) => {
        let response;
        try {
            const author = await AuthorSqlModel.getAllAuthor();
            response = {
                ResponseData: author,
                ResponseMessage: 'All Author Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    public static getAuthorById = async (req: Request, res: Response) => {
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        let response;
        try {
            const author = await AuthorSqlModel.getAuthorById(id);
            response = {
                ResponseData: author,
                ResponseMessage: 'Author Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }


    public static insertAuthor = async (req: Request, res: Response)=> {
        let response;
        try {
            //  ValidateInsertAuthor(req.body)
            // if (error) {
            //     return res.send(error.message).status(400).end();
            // }
            const name = req.body.data.name
            const country = req.body.data.country
            const insertedID = await AuthorSqlModel.insertAuthor(name, country)
            response = {
                ResponseData: insertedID,
                ResponseMessage: 'Author Inserted',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }

    public static updateAuthorById = async (req: Request, res: Response) => {
        let response;
        try {
            const { error } = ValidateInsertAuthor(req.body)
            if (error) {
                return res.send(error.message).status(500).end();
            }
            const id = req.params.id;
            const name = req.body.data.name;
            const country = req.body.data.country;
            if (!isValidId(id)) {
                return res.send("Invalid Id").status(200)

            }
            const author = await AuthorSqlModel.getAuthorById(id)
            if (!author) {
                return res.send({ ResponseMessage: "Author Id Not Found" }).status(400).end();
            }

            await AuthorSqlModel.updateAuthorById(id, name, country);
            response = {
                ResponseData: null,
                ResponseMessage: 'Author Updated'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }


    public static deleteAuthorById = async (req: Request, res: Response) => {
        let response;
        const id = req.params.id;
        if (!isValidId(id)) {
            return res.send("Invalid Id").status(200)
        }
        try {
            await AuthorSqlModel.deleteAuthorById(id);
            response = {
                ResponseData: null,
                ResponseMessage: 'Author Deleted'
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response);

    }


}

const InsertAuthor = AuthorController.insertAuthor
const GetAllAuthor = AuthorController.getAllAuthor
const GetAuthorById = AuthorController.getAuthorById
const UpdateAuthorById = AuthorController.updateAuthorById
const DeleteAuthorById = AuthorController.deleteAuthorById
export {
    InsertAuthor,
    GetAllAuthor,
    GetAuthorById,
    DeleteAuthorById,
    UpdateAuthorById
}

