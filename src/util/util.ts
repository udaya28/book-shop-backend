import mongoose from 'mongoose';

const isValidId = (id: string | number) => {
    return Number.isInteger(+id)
}


const isValidMongoId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id);
}

export { isValidId, isValidMongoId }