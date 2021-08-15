const jwt= require('jsonwebtoken');
const verifyToken=(req, res, next)=>{
    const authorizationHeader=req.headers['authorization'];
    const token= authorizationHeader && authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data)=>{
        if(err) return res.sendStatus(403);
        req.userId=data.userId;
        next();
    })
}
module.exports = verifyToken;