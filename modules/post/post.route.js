import { Router } from "express";
import {auth} from '../../middleware/auth.js'
import { validation } from "../../middleware/validation.js";
import {HM, myMulter,validationType} from '../../services/multer.js'
import { addPost, deletePost, getAllPosts, likePost, unLikePost, updatePost, userPosts } from "./controller/post.controller.js";
import { addPostSchema } from "./post.validation.js";

const router=Router();


router.post('/addPost',auth(),myMulter(validationType.image).single("image"),HM,validation(addPostSchema),addPost)
router.patch('/:postId/likePost',auth(),likePost)
router.patch('/:postId/unlikePost',auth(),unLikePost)
router.put('/updatePost/:postId',auth(),updatePost)
router.get('/getAllPosts',auth(),getAllPosts)
router.delete('/deletePost/:postId',auth(),deletePost)
router.get('/userPosts',auth(),userPosts)





export default router;