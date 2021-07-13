import mongoose from 'mongoose';
const isValidMongoIdUpdated = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error("Invalid Mongo Id")
}

export {
    isValidMongoIdUpdated
}