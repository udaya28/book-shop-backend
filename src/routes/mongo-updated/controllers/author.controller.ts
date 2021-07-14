import { Response, Request } from 'express';
import mongoose from 'mongoose';
import { AuthorDBNew } from './../../../model/mongo-updated/authors.model.mongo';
import { AuthorController, AuthorNew, BookResult } from './../interface'
import { createResponse, isValidAuthorId, isValidMongoIdUpdated } from '../util';
import { ApiResponse, DeleteResult } from '../interface';
import { handelError } from '../handel-error';

const validateAuthorId = async (authorId: string) => {
    isValidMongoIdUpdated(authorId)
    await isValidAuthorId(authorId)
}
class AuthorUpdatedController implements AuthorController {
    constructor() { }

    getAllAuthor = async (req: Request, res: Response): Promise<Response> => {
        let status;
        let response: ApiResponse<any>
        try {
            const authors: Array<AuthorNew> = await AuthorDBNew.find({});
            status = 200
            response = createResponse(authors, 'All Authors Fetched')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    getAuthorById = async (req: Request, res: Response): Promise<Response> => {
        let status;
        let response: ApiResponse<any>
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const author: Array<AuthorNew> = await AuthorDBNew.find({ _id: authorId });
            status = 200
            response = createResponse(author, 'Author Fetched')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    insertAuthor = async (req: Request, res: Response): Promise<Response> => {
        let status;
        let response: ApiResponse<any>
        try {
            const authorName: string = req.body.data.authorName
            const authorCountry: string = req.body.data.authorCountry
            const author: AuthorNew = await AuthorDBNew.create({
                authorName,
                authorCountry,
            });
            status = 200
            response = createResponse(author, 'Author Created')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    updatedAuthorById = async (req: Request, res: Response): Promise<Response> => {

        let response: ApiResponse<any>;
        let status: number;
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const authorName: string = req.body.data.authorName
            const authorCountry: string = req.body.data.authorCountry
            const author: mongoose.UpdateWriteOpResult = await AuthorDBNew.updateOne({ _id: authorId }, {
                authorName,
                authorCountry,
            });
            status = 200
            response = createResponse(author, 'Author Updated')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    deleteAuthorById = async (req: Request, res: Response): Promise<Response> => {
        let response: ApiResponse<any>;
        let status: number;
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const result: DeleteResult = await AuthorDBNew.deleteOne({ _id: authorId });
            status = 200
            response = createResponse(result, 'Author Deleted')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }


    getAllBookByAuthorId = async (req: Request, res: Response): Promise<Response> => {
        let response: ApiResponse<any>;
        let status: number;
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const books: Array<BookResult> = await AuthorDBNew.find({ _id: authorId }, '-_id books');
            status = 200
            response = createResponse(books, 'All books By author Fetched')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    getBookByAuthorId = async (req: Request, res: Response): Promise<Response> => {
        let response: ApiResponse<any>;
        let status: number;
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const bookTitle: string = req.params.bookTitle || ""
            const book: Array<BookResult> = await AuthorDBNew.find({ _id: authorId }, `-_id books.${bookTitle}`);
            status = 200
            response = createResponse(book, 'Book Fetched')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    addBookByAuthorId = async (req: Request, res: Response): Promise<Response> => {
        let response: ApiResponse<any>;
        let status: number;
        try {
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const title: string = req.body.data.title
            const publishedOn: string = req.body.data.publishedOn
            const genres: Array<string> = req.body.data.genres
            await AuthorDBNew.findOneAndUpdate({ _id: authorId }, { [`books.${title}`]: { title, publishedOn, genres } });
            status = 200
            response = createResponse(null, 'Added Book to Author')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }

    deleteBookByBookIdAndAuthorId = async (req: Request, res: Response): Promise<Response> => {
        let response: ApiResponse<any>;
        let status: number;
        try {
            ``
            const authorId: string = req.params.authorId
            await validateAuthorId(authorId)
            const title: string = req.params.bookTitle
            const result: DeleteResult = await AuthorDBNew.updateOne({ _id: authorId }, { $unset: { [`books.${title}`]: 1 } });
            status = 200
            response = createResponse(result, 'Deleted a Book in Author')
        } catch (error) {
            status = 500
            response = handelError(error)
        }
        return res.send(response).status(status);
    }
}

const authorController = new AuthorUpdatedController()
export default authorController

