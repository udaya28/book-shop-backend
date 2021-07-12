import Joi from "joi"

class ShopValidationMongo {
    constructor() { }

    public static validateShopMongo = (data: any) => {
        const schema = Joi.object().keys({
            data: {
                count: Joi.number().required(),
                bookId: Joi.string().required(),
            },
        });
        return schema.validate(data);
    }
}

const ValidateInsertShopMongo = ShopValidationMongo.validateShopMongo
export { ValidateInsertShopMongo }