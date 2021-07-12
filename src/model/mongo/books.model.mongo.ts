import mongoose, { Model } from 'mongoose';
import { BookMongo } from '../../interfaces/index';
const { Schema } = mongoose;

const BookMongo = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorCountry: {
        type: String,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
})

const BookDB: Model<BookMongo> = mongoose.model('book', BookMongo);

export { BookDB, BookMongo };


