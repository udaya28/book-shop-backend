import mongoose, { Model } from 'mongoose';
import { AuthorNew } from '../../routes/mongo-updated/interface';
const { Schema } = mongoose;

const BookMongoNew = new Schema({
    title: {
        type: String,
        required: true,
    },
    publishedOn: {
        type: Number,
        required: true,
    },
    genres: {
        type: [String],
        required: true
    }
}, { _id: false })


const AuthorMongoNew = new Schema({
    authorName: {
        type: String,
        required: true,
    },
    authorCountry: {
        type: String,
        required: true
    },
    books: {
        type: {BookMongoNew},
        required: false
    },
})

const AuthorDBNew: Model<AuthorNew> = mongoose.model('author-new', AuthorMongoNew);

export { AuthorDBNew };




// interface BookNew {
//     title: string,
//     publishedOn: string,
//     genres: Array<string>
// }

// interface AuthorNew {
//     id: string,
//     authorName: string,
//     authorCountry: string,
//     books: {
//         [key: string]: BookNew
//     }
// }


