import mongoose from 'mongoose';
import { AuthorDBNew } from './../../model/mongo-updated/authors.model.mongo';
import { ApiResponse } from './interface';
import { Request } from 'express';

const isValidMongoIdUpdated = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Mongo Id")
}

const isValidAuthorId = async (id: string) => {
    const author: any = await AuthorDBNew.findOne({ _id: id });
    if (!author) throw new Error("Invalid Author Id")
}

const isValidAuthorName = async (authorName: string) => {
    const author: any = await AuthorDBNew.findOne({ authorName });
    if (author) throw new Error("Author Name Already Exist")
}

const isValidBookId = async (authorId: string, bookId: string) => {
    const book: any = await AuthorDBNew.findOne({ _id: authorId }, `-_id books.${bookId}`);
    if (!(book?.["books"]?.[bookId])) throw new Error("Book not present in the Author")
    return book
}

const createResponse = (ResponseData: any, ResponseMessage: string): ApiResponse<any> => ({ ResponseData, ResponseMessage })

const fetchAuthorId = async (req: Request): Promise<string> => {
    isValidMongoIdUpdated(req.params.authorId)
    await isValidAuthorId(req.params.authorId)
    return req.params.authorId
}

const fetchBookByAuthorIdAndBookId = async (authorId: string, bookId: string) => {
    isValidMongoIdUpdated(bookId)
    const book = await isValidBookId(authorId, bookId)
    const {_id, title, publishedOn, genres } = book.books[bookId]
    return {_id, title, publishedOn, genres }
}


const compareBookData = (newData: any, oldData: any) => {
    let flag: boolean = true;
    let keys = Object.keys(newData)
    for (let i = 0; i < keys.length; i++) {
        if (keys[i] === 'genres') {
            if (newData['genres'].sort().join(",") != oldData['genres'].sort().join(",")) {
                flag = false;
                break;
            }
        } else if (newData[keys[i]] != oldData[keys[i]]) {
            flag = false;
            break;
        }
    }
    if (flag) throw new Error("No change in the Data")
}


export {
    isValidMongoIdUpdated,
    isValidAuthorId,
    createResponse,
    fetchAuthorId,
    isValidAuthorName,
    fetchBookByAuthorIdAndBookId,
    compareBookData
}