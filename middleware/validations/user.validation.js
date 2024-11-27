import { body } from 'express-validator';

export const userValidatorRules = () => {
    return [
        body('email')
            .notEmpty()
            .withMessage('Email is required.')
            .isEmail()
            .withMessage('Email must be standard with @.'),
        body('password')
            .notEmpty()
            .withMessage('Password is required.')
            .isLength({ min: 8 })
            .withMessage('Password too short. Min 8.')
    ]
};