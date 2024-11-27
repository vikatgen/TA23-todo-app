import { body } from 'express-validator';

export const todoValidatorRules = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage('Title is required.')
            .isLength({ min: 3 })
            .withMessage('Minimum 3 characters required.'),
        body('description')
            .notEmpty()
            .withMessage('Description is required.'),
        body('status').isIn([
            "DONE",
            "IN_PROGRESS",
            "TODO"
        ])
    ]
};