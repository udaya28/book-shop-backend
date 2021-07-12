import mongoose, { Model } from 'mongoose';
import { shopMongo } from '../../interfaces/index';
import { BookMongo } from './books.model.mongo';
const { Schema } = mongoose;

const ShopMongo = new Schema({
    count: {
        type: Number,
        required: true,
    },
    book: [{ type: Schema.Types.ObjectId, ref: 'book' }]
})

const ShopDB: Model<shopMongo> = mongoose.model('shop', ShopMongo);

export { ShopDB };


