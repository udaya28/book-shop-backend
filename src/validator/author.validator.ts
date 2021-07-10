import Joi from "joi"

class AuthorValidation {
  constructor() { }

  public static validateInsertAuthor = (data: any) => {
    const schema = Joi.object().keys({
      data: {
        name: Joi.string().required(),
        country: Joi.string().required(),
      },
    });
    return schema.validate(data);
  }
}

const ValidateInsertAuthor = AuthorValidation.validateInsertAuthor
export { ValidateInsertAuthor }