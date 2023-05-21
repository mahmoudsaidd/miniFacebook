import { Router } from "express";
import { forgetPassSchema, signInSchema, signUpSchema } from "./auth.validation.js";
import { confirmEmail, forgetPassword, refreshToken, sendCode, signIn, signUp } from "./controller/auth.controller.js";
import {validation} from '../../middleware/validation.js'


const router=Router();


router.post('/signUp',validation(signUpSchema),signUp)
router.post('/signIn',validation(signInSchema),signIn)
router.get('/confirmEmail/:token',confirmEmail)
router.get('/refreshToken/:token',refreshToken)
router.post('/sendCode',sendCode)
router.post('/forgetPassword',validation(forgetPassSchema),forgetPassword)
export default router;