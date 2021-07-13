import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { AuthorDBNew } from './../../../model/mongo-updated/authors.model.mongo';
import { AuthorNew, BookResult } from './../interface'
import { isValidMongoIdUpdated } from '../util';
import { ApiResponse, AuthorController, DeleteResult } from '../interface';


class AuthorUpdatedController implements AuthorController {
    constructor() { }

    getAllAuthor = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<Array<AuthorNew>>;
        try {
            const authors: Array<AuthorNew> = await AuthorDBNew.find({});
            response = {
                ResponseData: authors,
                ResponseMessage: 'All Authors Fetched',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    getAuthorById = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<Array<AuthorNew>>;
        try {
            const authorId: string = req.params.authorId
            isValidMongoIdUpdated(authorId)
            const author: Array<AuthorNew> = await AuthorDBNew.find({ _id: authorId });
            response = {
                ResponseData: author,
                ResponseMessage: 'Author Fetched',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }

    insertAuthor = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<any>;
        try {
            const authorName: string = req.body.data.authorName
            const authorCountry: string = req.body.data.authorCountry
            const author: AuthorNew = await AuthorDBNew.create({
                authorName,
                authorCountry,
            });
            response = {
                ResponseData: author,
                ResponseMessage: 'Author Created',
            }
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    updatedAuthorById = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<any>;
        try {
            const authorId: string = req.params.authorId
            isValidMongoIdUpdated(authorId)
            const authorName: string = req.body.data.authorName
            const authorCountry: string = req.body.data.authorCountry
            const author: mongoose.UpdateWriteOpResult = await AuthorDBNew.updateOne({ _id: authorId }, {
                authorName,
                authorCountry,
            });
            response = {
                ResponseData: author,
                ResponseMessage: 'Author Updated',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    deleteAuthorById = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<any>;
        try {
            const authorId: string = req.params.authorId
            isValidMongoIdUpdated(authorId)
            const result: DeleteResult = await AuthorDBNew.deleteOne({ _id: authorId });
            response = {
                ResponseData: result,
                ResponseMessage: 'Author Deleted',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);

    }

    // -----------------------------------------------------------------

    getAllBookByAuthorId = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<Array<BookResult>>;
        try {
            const authorId: string = req.params.authorId
            isValidMongoIdUpdated(authorId)
            const authors: Array<BookResult> = await AuthorDBNew.find({ _id: authorId }, '-_id books');
            response = {
                ResponseData: authors,
                ResponseMessage: 'All books By author Fetched',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    getBookByAuthorId = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<Array<BookResult>>;
        try {
            const authorId: string = req.params.authorId
            const bookTitle: string = req.params.bookTitle || ""
            isValidMongoIdUpdated(authorId)
            const authors: Array<BookResult> = await AuthorDBNew.find({ _id: authorId }, `-_id books.${bookTitle}`);
            response = {
                ResponseData: authors,
                ResponseMessage: 'All books By author Fetched',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    addBookByAuthorId = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<any>;
        try {
            const authorId: string = req.params.authorId
            const title: string = req.body.data.title
            const publishedOn: string = req.body.data.publishedOn
            const genres: Array<string> = req.body.data.genres
            isValidMongoIdUpdated(authorId)
            const propertyName: string = `books.${title}`
            await AuthorDBNew.findOneAndUpdate({ _id: authorId }, { [propertyName]: { title, publishedOn, genres } });
            response = {
                ResponseData: null,
                ResponseMessage: 'Added Book to Author',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

    deleteBookByBookIdAndAuthorId = async (req: Request, res: Response): Promise<any> => {
        let response: ApiResponse<any>;
        try {
            const authorId: string = req.params.authorId
            const title: string = req.params.bookTitle
            isValidMongoIdUpdated(authorId)
            const propertyName: string = `books.${title}`
            await AuthorDBNew.findOneAndUpdate({ _id: authorId }, { [propertyName]: null });
            response = {
                ResponseData: null,
                ResponseMessage: 'deleted a Book in Author',
            }
        } catch (error) {
            console.log(error.message);
            if (error.message === "Invalid Mongo Id") {
                response = {
                    ResponseData: null,
                    ResponseMessage: error.message,
                }
                return res.send(response).status(400);
            }
            return res.status(500).end();
        }
        return res.send(response).status(200);
    }

}

const AuthorController = new AuthorUpdatedController()
const GetAllAuthor = AuthorController.getAllAuthor;
const GetAuthorById = AuthorController.getAuthorById;
const InsertAuthor = AuthorController.insertAuthor;
const UpdatedAuthorById = AuthorController.updatedAuthorById;
const DeleteAuthorById = AuthorController.deleteAuthorById;

const GetAllBookByAuthorId = AuthorController.getAllBookByAuthorId;
const GetBookByAuthorId = AuthorController.getBookByAuthorId;
const AddBookByAuthorId = AuthorController.addBookByAuthorId;
const DeleteBookByBookIdAndAuthorId = AuthorController.deleteBookByBookIdAndAuthorId;

export {
    GetAllAuthor,
    GetAuthorById,
    InsertAuthor,
    DeleteAuthorById,
    UpdatedAuthorById,
    GetAllBookByAuthorId,
    GetBookByAuthorId,
    AddBookByAuthorId,
    DeleteBookByBookIdAndAuthorId
}