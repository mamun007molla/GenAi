import { Router } from "express";
import { logoutUserController,loginUserController, registerUserController, getMeController } from "../controllers/auth.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

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


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access public
 */
router.get("/get-me",authUser,getMeController)