import { Router } from "express";
import { changePassword, coverPic, DeleteUser, getAllUsers, getSpecificUser, profilePic } from "./controller/user.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import { changePasswordSchema, deletedUserSchema, getAllUsersSchema } from "./user.validation.js";
import { HM, myMulter, validationType } from "../../services/multer.js";


const router=Router();


router.patch('/changePassword',auth(),validation(changePasswordSchema),changePassword)
router.delete('/deleteUser',auth(),validation(deletedUserSchema),DeleteUser)
router.get('/getAllUsers',auth(),validation(getAllUsersSchema),getAllUsers)
router.get('/getSpecificUser',auth(),getSpecificUser)
router.put('/profilePic',auth(),myMulter(validationType.image).single("image"),HM,profilePic)
router.put('/coverPic',auth(),myMulter(validationType.image).array('image',5),coverPic)


export default router;