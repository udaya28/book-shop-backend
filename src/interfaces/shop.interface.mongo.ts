import { Document } from 'mongoose';
import { BookMongo } from './index'

interface shopMongo extends Document {
    id: number | string,
    count: number,
    book: BookMongo
}

export { shopMongo }