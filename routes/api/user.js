const express = require('express');
const userController = require('../../controller/userController');
const router = express.Router();
const authenticate = require('../../middlewares/authenticate');
const useJoi = require('../../validations/user');
const {validateBody} = require('../../middlewares/contacts')
const loader = require('../../middlewares/loader');


router.post("/register", validateBody(useJoi.registerSchema), userController.register);
router.post("/login", validateBody(useJoi.loginSchema), userController.login);
router.post("/logout", authenticate, userController.logout);
router.get("/current", authenticate, userController.getUser);
router.patch("/",authenticate,validateBody(useJoi.subscriptionSchema),userController.updateSubscription);
router.patch('/avatars',authenticate,loader.single("avatar"),userController.uploadAvatar);
router.get('/verify/:verificationToken',userController.verifyUser);
router.post('/verify',validateBody(useJoi.resentVerificationSchema),userController.resendVerifyMessage);
module.exports = router;

