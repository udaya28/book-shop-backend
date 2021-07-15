import Joi from "joi"

const authorSchema: Joi.ObjectSchema<any> = Joi.object().keys({
    data: {
        authorName: Joi.string().required(),
        authorCountry: Joi.string().required(),
    },
});

const updateAuthorSchema: Joi.ObjectSchema<any> = Joi.object().keys({
    data: {
        authorName: Joi.string(),
        authorCountry: Joi.string(),
    },
});

const bookSchema: Joi.ObjectSchema<any> = Joi.object().keys({
    data: {
        title: Joi.string().required(),
        publishedOn: Joi.number().required(),
        genres: Joi.array().items(Joi.string()).required(),
    },
});
const updateBookSchema: Joi.ObjectSchema<any> = Joi.object().keys({
    data: {
        title: Joi.string(),
        publishedOn: Joi.number(),
        genres: Joi.array().items(Joi.string()),
    },
});

export {
    authorSchema,
    bookSchema,
    updateAuthorSchema,
    updateBookSchema
}