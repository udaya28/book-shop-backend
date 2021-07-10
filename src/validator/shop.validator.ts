import Joi from "joi"

class ShopValidation {
    constructor() { }

    public static validateInsertShop = (data: any) => {
        const schema = Joi.object().keys({
            data: {
                bookId: Joi.number().required(),
                count: Joi.number().required()
            },
        });
        return schema.validate(data);
    }
}

const ValidateInsertShopBook = ShopValidation.validateInsertShop
export { ValidateInsertShopBook }