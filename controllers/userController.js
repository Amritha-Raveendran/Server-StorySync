// user related controllers are written here.

const users = require('../model/userModel')
// import jwt
const jwt = require('jsonwebtoken')


// 1) user register controller
exports.register = async (req, res) => {
    console.log('Inside a register controller');

    //logic
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email }) //email : email

        if (existingUser) {
            res.status(406).json(`User already exist , Please login...!!!!`)
        }
        else {
            const newUser = new users({
                username, //username : username
                email, //email : email,
                password, //   password :password,
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        console.error("Error saving user:", error);
        res.status(401).json(error)
    }
}

// 2) user login controller
exports.login = async (req, res) => {
    console.log('Inside a login controller');

    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUsers = await users.findOne({ email, password })

        if (existingUsers) {

            const token = jwt.sign({
                userId: existingUsers.
                    _id
            }, "secretkey")
            res.status(200).json({ existingUsers, token })
        }
        else {
            res.status(406).json("Incorrect email or password")
        }
    } catch (error) {
        res.status(401).json(error)

    }

}

// 3)Google Authentication
exports.googleLogin = async (req, res) => {
    console.log("Inside google login controller");

    const { username, email, userProfile } = req.body
    console.log(username, email, userProfile)

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({
                userId: existingUser.
                    _id
            }, "secretkey")
            res.status(200).json({ existingUser, token })
        }
        else {
            const newUser = new users({
                username  ,
                email,
                userProfile                
            })
            await newUser.save();
            const token = jwt.sign({ userId: newUser._id }, "secretkey")
            res.status(200).json({ existingUser: newUser, token })
        }
        

    } catch (error) {
        res.status(406).json(error)
    }

}


// get all users to display at user dashboard

exports.getAllUsersController = async(req, res)=>{
console.log('Inside get all user controller');
try {
    const allusers = await users.find();
    
    res.status(200).json(allusers)
    
} catch (error) {
    return res.status(406).json(error)
}
}



// get a single user - logged user details for setting profile

exports.getUserController= async (req, res)=>{
    console.log("Inside get user Controller");
    try {

        const {userId} = req.params

        const user = await users.findById(userId)
        if(!user){
            res.status(406).json({message:"User not found"})
        }else{
            res.status(200).json(user)
        }
        
    } catch (error) {
        console.error(error);
        res.status(490).json({ message: "Server error", error })
    }
    
}


// update user profile controller

exports.updateUserProfileController = async (req, res) => {
    console.log("Inside update user profile controller");
  
    const { userId } = req.params
    const { username, email, password, userProfile, socialLink } = req.body
  
  
  
    // If a file is uploaded, use the filename, otherwise, use the existing userProfile
    const uploadImg = req.file ? req.file.filename : (typeof userProfile === 'string' && userProfile.trim() !== '{}' ? userProfile : '');

  
    // Debugging log for uploadImg
    console.log("User Profile:", uploadImg);  // Ensure this is a string, not an object
  
    try {
      const updatedUser = await users.findByIdAndUpdate(
        { _id: userId },
        {
          username,
          email,
          password,
          userProfile: uploadImg,
          socialLink,
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  // view a perticular story
  exports.getSingleUserContoller = async(req, res)=>{
      const {userId} = req.params
      const { username,userProfile} = req.body
      try {
          const user = await users.findById(userId).select('username userProfile')
          if(!user)
          {
              return res.status(404).json({ message: "user not found" })
          }
          res.status(200).json(user)
      } catch (error) {
          console.error("Error fetching story by ID:", error)
      res.status(500).json({ message: "Server error" })
      }
  }
  
  
