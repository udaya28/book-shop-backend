import Joi from "joi"

const authorSchema = Joi.object().keys({
    data: {
        authorName: Joi.string().required(),
        authorCountry: Joi.string().required(),
    },
});


const bookSchema = Joi.object().keys({
    data: {
        title: Joi.string().required(),
        publishedOn: Joi.number().required(),
        genres: Joi.array().items(Joi.string()).required(),
    },
});

export{
    authorSchema,
    bookSchema
}