import Joi from "joi"

class BookValidation {
    constructor() { }

    public static validateInsertBook = (data: any) => {
        const schema = Joi.object().keys({
            data: {
                title: Joi.string().required(),
                price: Joi.number().required(),
                authorName: Joi.string().required(),
                genreIdArray: Joi.required()
            },
        });
        return schema.validate(data);
    }
}

const ValidateInsertBook = BookValidation.validateInsertBook
export { ValidateInsertBook }