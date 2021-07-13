import Joi from "joi"

class GenreValidation {
  constructor() { }

  public static validateInsertGenre = (data: any) => {
    const schema = Joi.object().keys({
      data: {
        genre: Joi.string().required(),
      },
    });
     schema.validate(data);

    //  if(! schema.validate(data)) throw {customErr()}
  }
}

const ValidateInsertGenre = GenreValidation.validateInsertGenre
export { ValidateInsertGenre }