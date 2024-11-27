import { validationResult } from 'express-validator';

export const validate = (request, response, next) => {

    const result = validationResult(request);

    if(result?.errors.length) {
        return response.status(400).json({
            message: "Validation errors.",
            errors: result.errors
        })
    }

    next();
};