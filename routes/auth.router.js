import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { userValidatorRules } from "../middleware/validations/user.validation.js";

const router = Router();

router.post('/register', userValidatorRules(), validate, register);
router.post('/login', userValidatorRules(), validate, login)

export default router;