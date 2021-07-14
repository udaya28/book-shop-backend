import Joi from "joi"
import { Response, Request, NextFunction } from 'express';

const validateMiddleware = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error == null) {
            next()
        } else {
            const { details } = error;
            const message: string = details.map(i => i.message).join(',')
            console.log("error", message);
            res.status(400).send({ ResponseMessage: message })
        }
    }
}

export {
    validateMiddleware
}