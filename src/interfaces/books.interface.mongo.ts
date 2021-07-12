import { Document } from 'mongoose';
interface BookMongo extends Document{
    id: number | string,
    title: string,
    price: number,
    authorName: string,
    authorCountry: string,
    genre: Array<string>,
}

export { BookMongo }