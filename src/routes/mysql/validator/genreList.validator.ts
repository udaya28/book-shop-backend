import Joi from "joi"

class GenreListValidation {
  constructor() { }

  public static validateInsertGenreList = (data: any) => {
    const schema = Joi.object().keys({
      data: {
        bookId: Joi.number().required(),
        genreId: Joi.number().required(),
      },
    });
    return schema.validate(data);
  }
}

const ValidateInsertGenreList = GenreListValidation.validateInsertGenreList
export { ValidateInsertGenreList }