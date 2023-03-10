const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
    if (await req.headers.authorisation) {
        //console.log("in it");
        try {
            //console.log("inside it");
            const authToken = await req.headers.authorisation;
            req.user = jwt.verify(authToken, process.env.SECRET);
            next();
        } catch (err) {
            console.log(err.message);
            res
                .json({ message: "You are not Authorised ! ", success: false })
                .status(400);
        }
    } else {
        return res
            .json({ message: "You are not Authorised! ", success: false })
            .status(400);
    }
};
module.exports = tokenValidator;