import { Router } from "express";
import { logoutUserController,loginUserController, registerUserController } from "../controllers/auth.controller.js";

export const router=Router()


/**
* @route POST /api/auth/register
* @description register a new user
* @access public
*/
router.post("/register",registerUserController)



/**
* @route POST /api/auth/login
* @description login a new user
* @access public
*/
router.post("/login",loginUserController)



/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
router.get("/logout",logoutUserController)