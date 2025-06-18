const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{

    // first check request header has authorization or not
    const authorization = req.headers.authorization
    if(!authorization)
        return res.status(401).json({error:'Token not found'})
    //Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token)
        return res.status(401).json({error:'Unauthorized'});

    try{
        //Verify the JWT token
        jwt.verify(token,process.env.JWT_SECRET);

        //Attach user information to the request object
        req.user = decoded
        //const decoded = jwt.verify(token, secretKey); // This line might be missing

        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid token'});
    }
}

// Function to generate JWT token
const generateToken = (userData)=>{
    //Generate a new JWT token using user Data 

    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:30000});
}

module.exports = {jwtAuthMiddleware ,generateToken} ;