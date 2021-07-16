import { Response, Request } from 'express';

interface AuthorController {
    getAllAuthor(req: Request, res: Response): Promise<Response>
    getAuthorById(req: Request, res: Response): Promise<Response>
    insertAuthor(req: Request, res: Response): Promise<Response>
    updatedAuthorById(req: Request, res: Response): Promise<Response>
    deleteAuthorById(req: Request, res: Response): Promise<Response>
    getAllBookByAuthorId(req: Request, res: Response): Promise<Response>
    getBookByAuthorIdAndBookId(req: Request, res: Response): Promise<Response>
    insertBookByAuthorId(req: Request, res: Response): Promise<Response>
    updateBookByAuthorIdAndBookId(req: Request, res: Response): Promise<Response>
    deleteBookByAuthorIdAndBookId(req: Request, res: Response): Promise<Response>
}
interface BookNew {
    id?: string,
    title: string,
    publishedOn: string,
    genres: Array<string>
}
interface AuthorNew {
    id?: string,
    authorName: string,
    authorCountry: string,
    books?: {
        [key: string]: BookNew
    }
}
interface DeleteResult {
    ok?: number;
    n?: number;
    deletedCount?: number;
}
interface BookResult {
    books?: {
        [key: string]: BookNew
    }
}
interface ApiResponse<T> {
    ResponseData: T,
    ResponseMessage: string
}


export {
    ApiResponse,
    DeleteResult,
    BookNew,
    AuthorNew,
    BookResult,
    AuthorController
}

