import { Response, Request } from 'express';

interface BookNew {
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


interface ApiResponse<T> {
    ResponseData: T,
    ResponseMessage: string
}

interface DeleteResult {
    ok?: number;
    n?: number;
    deletedCount?: number;
}

interface AuthorController {
    getAllAuthor(req: Request, res: Response): Promise<any>,
    getAuthorById(req: Request, res: Response): Promise<any>,
    insertAuthor(req: Request, res: Response): Promise<any>,
    updatedAuthorById(req: Request, res: Response): Promise<any>,
    deleteAuthorById(req: Request, res: Response): Promise<any>,

    getAllBookByAuthorId(req: Request, res: Response): Promise<any>,
    getBookByAuthorId(req: Request, res: Response): Promise<any>,
    addBookByAuthorId(req: Request, res: Response): Promise<any>,
    deleteBookByBookIdAndAuthorId(req: Request, res: Response): Promise<any>,
}

interface BookResult{
    books?: {
        [key: string]: BookNew
    }
}



export {
    ApiResponse,
    DeleteResult,
    AuthorController,
    BookNew,
    AuthorNew,
    BookResult
}