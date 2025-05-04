const jwt = require('jsonwebtoken');
const admin = require('../config/firebase-admin');

const jwtMiddleware = async (req, res, next) => {
  const authHeader = req.headers['authorization'];


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: "Authorization token missing" })
  }

  const token = authHeader.split(' ')[1]

  // Firebase verification 
  try {
    const decodedToken = await admin.auth().verifyIdToken(token)
    // console.log('Firebase User:', decodedToken);
    req.user = decodedToken // Attach user data
    next()
  } catch (firebaseError) {
    console.log("Firebase verification failed:", firebaseError.message)
  }

  // If Firebase fails, try custom JWT
  try {
    const decodedJwt = jwt.verify(token, "secretkey"); // 
    // console.log('Custom JWT User:', decodedJwt);
    req.user = { uid: decodedJwt.userId, username: decodedJwt.username }
    next()
  } catch (jwtError) {
    console.log("JWT verification failed:", jwtError.message);
    return res.status(401).json({ message: "Invalid token" })
  }
};

module.exports = jwtMiddleware;