import Joi from "joi"

class BookValidationMongo {
    constructor() { }

    public static validateBookMongo = (data: any) => {
        const schema = Joi.object().keys({
            data: {
                title: Joi.string().required(),
                price: Joi.number().required(),
                authorName: Joi.string().required(),
                authorCountry: Joi.string().required(),
                genre: Joi.array().items(Joi.string()).required(),
            },
        });
        return schema.validate(data);
    }
}

const ValidateInsertBookMongo = BookValidationMongo.validateBookMongo
export { ValidateInsertBookMongo }