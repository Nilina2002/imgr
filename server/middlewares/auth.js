import jwt from 'jsonwebtoken';     

const userAuth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "No token provided, authorization denied"
        });        
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        

        if (tokenDecode.id) {
            // req.userId = { id: tokenDecode.id };
            req.userId = tokenDecode.id;

        }else{
            return res.json({
                success: false,
                message: "Invalid token"
            });
        }
        next();
    } catch (error) {
        res.json({
            success: false,
            message: "Invalid tokenyoyo",
        });
    }
}

export default userAuth;