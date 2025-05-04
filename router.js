const express = require('express')
const userController = require('./controllers/userController')

const storyController = require('./controllers/storyController')

const commentController = require('./controllers/commentController')

const likeController = require('./controllers/likeController')

// import jwtmiddleware
const jwtMiddleware = require('./middlewares/jwtmiddleware')
const multerConfig = require('./middlewares/multerMiddleware')



const router = new express.Router()

// user register
router.post('/register' , userController.register)

//user login
router.post('/login',userController.login)

// google authentication login
router.post('/google-login',userController.googleLogin)


// add story
router.post('/write',jwtMiddleware,multerConfig.none(),storyController.addStory)

// get trending 
router.get('/trendingStories', storyController.displayHomeProjectController)


// get all stories
router.get('/dashboard',jwtMiddleware, storyController.getAllStoriesController)

//get user storie only
router.get(`/user/:userId/stories`,jwtMiddleware, storyController.getUserStoriesController)

// get all users 
router.get('/getAllUsers', jwtMiddleware, userController.getAllUsersController)

// get user details to set up profile

router.get(`/getUser/:userId`,jwtMiddleware, userController.getUserController)

// delete user story
router.delete('/deletestories/:storyId', jwtMiddleware, storyController.deleteUserStoryController)

// update user stories
router.put('/updateUserStories/:id',jwtMiddleware,storyController.editUserStoryController)


// update user profile
router.put('/update-profile/:userId',jwtMiddleware,multerConfig.single("userProfile"),userController.updateUserProfileController)


//get view story
router.get('/view-story/:storyId',jwtMiddleware,storyController.getStoryContoller)

// get user view story
router.get('/user/:userId',jwtMiddleware ,userController.getSingleUserContoller  )

// COMMENT 
router.post('/comment/:storyId/:userId', jwtMiddleware, commentController.addCommentController)

// Get Comment
router.get('/comment/:storyId', jwtMiddleware, commentController.getCommentController);

// delete comment
router.delete('/comment/:commentId', jwtMiddleware,commentController.deleteCommentController)


// like 
router.post('/like/:storyId',jwtMiddleware,likeController.likeStoryController)

//get like count
router.get("/like/:storyId", jwtMiddleware,likeController.getLikeCountController )


module.exports = router