import mongoose from 'mongoose';
import { AuthorDBNew } from './../../model/mongo-updated/authors.model.mongo';
const isValidMongoIdUpdated = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Mongo Id")
}

const isValidAuthorId = async (id: string) => {
    const author: any = await AuthorDBNew.findOne({ _id: id });
    if (!author || author.length == 0) throw new Error("Invalid Author Id")
}

export {
    isValidMongoIdUpdated,
    isValidAuthorId
}