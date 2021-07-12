import Joi from "joi"

class GenreValidation {
  constructor() { }

  public static validateInsertGenre = (data: any) => {
    const schema = Joi.object().keys({
      data: {
        genre: Joi.string().required(),
      },
    });
    return schema.validate(data);
  }
}

const ValidateInsertGenre = GenreValidation.validateInsertGenre
export { ValidateInsertGenre }