
const stories = require('../model/storyModel')
const users = require('../model/userModel')

exports.addStory = async (req, res) => {
    console.log("Inside Add Story Controller");

    console.log(req.body);
    const { storyTitle, storyCategory, storyContent } = req.body
    const userId = req.user?.uid
    const username = req.body.username;
    console.log(storyTitle, storyCategory, storyContent, userId, username);

    try {

        if (!storyTitle || !storyCategory || !storyContent) {
            return res.status(406).json("Fill all the fileds")
        }
        else {
            const user = await users.findById(userId)
            if (!user) {
                return res.status(406).json("User not found")
            }
        }


        // Create new story
        const newStory = new stories({
            storyTitle,
            storyContent,
            storyCategory,
            username,
            userId
        });


        await newStory.save()
        return res.status(200).json({ message: "Story added successfully", story: newStory });



    } catch (error) {
        return res.status(500).json({ message: `Adding Story failed due to: ${error.message}` });
    }
}


//  display project , when  the view all button clicked on home page

exports.displayHomeProjectController = async (req, res) => {
    console.log('Inside display home project Controller, when the View All button clicked on home page (Explore trending Stories) ');


    // logic

    try {

        const allStories = await stories.find().limit(4);
        res.status(200).json(allStories)

    } catch (error) {
        return res.status(406).json(error)
    }

}

// get all stories
exports.getAllStoriesController = async (req, res) => {
    console.log('Inside get all Stories controller');
    try {
        const allStories = await stories.find()

        res.status(200).json(allStories)

    } catch (error) {
        return res.status(406).json(error)
    }
}

//get user stories
exports.getUserStoriesController = async (req, res) => {
    console.log("Inside get single user story Controller");
    try {

        const { userId } = req.params
        const { createdAt } = req.body

        const userStories = await stories.find({ userId }).sort({ createdAt: -1 })
        if (userStories.length === 0) {
            return res.status(404).json({ message: "No stories found by you" })
        }
        res.status(200).json(userStories);

    } catch (error) {
        res.status(406).json(error)
    }

}

//  Delete a user story
exports.deleteUserStoryController = async (req, res) => {
    console.log("Inside delete User Story Controller ");
    try {

        const { storyId } = req.params

        if (!storyId) {
            return res.status(404).json({ message: 'Storyid not found' });
        }

        const deletedStory = await stories.findByIdAndDelete(storyId)

        if (!deletedStory) {
            return res.status(404).json({ message: 'Story not found' });
        }
        else{
           return res.status(200).json({ message: 'Story deleted successfully' })
        }

    } catch (error) {
        res.status(406).json(error)
    }

}

// edit user story

exports.editUserStoryController= async (req, res)=>{
    console.log("Inside itUserStoryController");
      
    const {id} = req.params
    const userId = req.payload

    const {storyTitle,storyContent,storyCategory} = req.body

    try{
        const existingUser = await stories.findByIdAndUpdate({_id:id},{
            storyTitle,
            storyContent,
            storyCategory,
            userId
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)
    }
    catch(error){
        res.status(401).json(error)
    }
}


// view a perticular story
exports.getStoryContoller = async(req, res)=>{
    const {storyId} = req.params
    try {
        const story = await stories.findById(storyId)
        if(!story)
        {
            return res.status(404).json({ message: "Story not found" })
        }
        res.status(200).json(story)
    } catch (error) {
        console.error("Error fetching story by ID:", error)
    res.status(500).json({ message: "Server error" })
    }
}