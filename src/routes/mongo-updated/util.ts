import mongoose from 'mongoose';
import { AuthorDBNew } from './../../model/mongo-updated/authors.model.mongo';
import { ApiResponse } from './interface';
import {  Request } from 'express';

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

const createResponse = (ResponseData: any, ResponseMessage: string): ApiResponse<any> => ({ ResponseData, ResponseMessage })

const fetchAuthorId = async (req:Request):Promise<string> => {
    isValidMongoIdUpdated(req.params.authorId)
    await isValidAuthorId(req.params.authorId)
    return req.params.authorId
}

export {
    isValidMongoIdUpdated,
    isValidAuthorId,
    createResponse,
    fetchAuthorId,
    isValidAuthorName
}